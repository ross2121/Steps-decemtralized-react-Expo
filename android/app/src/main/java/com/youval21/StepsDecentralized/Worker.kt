import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
import android.util.Log
import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.records.StepsRecord
import androidx.health.connect.client.request.ReadRecordsRequest
import androidx.health.connect.client.time.TimeRangeFilter
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import com.youval21.StepsDecentralized.RetrofitClient
import com.youval21.StepsDecentralized.StepsRequest
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.time.ZoneId
import java.time.ZonedDateTime

class HealthDataWorker(appContext: Context, workerParams: WorkerParameters) :
    CoroutineWorker(appContext, workerParams) {

    companion object {
        private const val TAG = "HealthDataWorker"
    }

    override suspend fun doWork(): Result {
        return withContext(Dispatchers.IO) {
            try {
                // Try to get user ID, but continue even if not found
                val userId = try {
                    AsyncStorageHelper(applicationContext).getAsyncStorageValue("userid")
                } catch (e: Exception) {
                    Log.w(TAG, "Couldn't access AsyncStorage, continuing without user ID", e)
                    null
                }

                if (userId.isNullOrEmpty()) {
                    Log.w(TAG, "User ID not found or user not signed up - continuing steps collection")
                } else {
                    Log.d(TAG, "User ID: $userId")
                }

                // Always fetch steps regardless of user ID status
                val steps = fetchStepsFromHealthConnect()
                Log.d(TAG, "Fetched steps: $steps")

                // Only send to server if we have a user ID
                if (!userId.isNullOrEmpty()) {
                    try {
                        val response = RetrofitClient.instance.sendSteps(
                            StepsRequest(steps.toString(), userId)
                        )
                        Log.d(TAG, "Server response: $response")
                    } catch (e: Exception) {
                        Log.e(TAG, "Error sending steps to server", e)
                        // Continue even if server communication fails
                    }
                }

                Result.success()
            } catch (e: Exception) {
                Log.e(TAG, "Error in HealthDataWorker", e)
                // Return success even if there's an error to prevent retry loops
                Result.success()
            }
        }
    }

    private suspend fun fetchStepsFromHealthConnect(): Long {
        return try {
            val healthConnectClient = HealthConnectClient.getOrCreate(applicationContext)
            val now = ZonedDateTime.now()
            val startOfDay = now.toLocalDate().atStartOfDay(ZoneId.systemDefault())
            val endOfDay = now
            val timeRangeFilter = TimeRangeFilter.between(
                startOfDay.toInstant(),
                endOfDay.toInstant()
            )
            val request = ReadRecordsRequest(
                recordType = StepsRecord::class,
                timeRangeFilter = timeRangeFilter
            )

            Log.d(TAG, "Fetching steps from Health Connect...")
            val response = healthConnectClient.readRecords(request)
            val totalSteps = response.records.sumOf { it.count }
            Log.d(TAG, "Total steps fetched: $totalSteps")
            totalSteps
        } catch (e: Exception) {
            Log.e(TAG, "Error fetching steps from Health Connect", e)
            0 // Return 0 if steps can't be fetched
        }
    }
}