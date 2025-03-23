import android.util.Log
import com.youval21.StepsDecentralized.RetrofitClient
import com.youval21.StepsDecentralized.StepsRequest
import android.content.Context
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.records.StepsRecord
import androidx.health.connect.client.request.ReadRecordsRequest
import androidx.health.connect.client.time.TimeRangeFilter
import java.time.Instant
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
                Log.d(TAG, "Starting HealthDataWorker...")
                 val responses = RetrofitClient.instance.getstep();
                val response = RetrofitClient.instance.sendSteps(StepsRequest(67));
                Log.d(TAG, "Steps sent to server. Response: $response")   
                 
                Result.success()
            } catch (e: Exception) {
                Log.e(TAG, "Error in HealthDataWorker: ${e.message}", e)
                Result.failure()
            }
        }
    }
    private suspend fun fetchStepsFromHealthConnect(): Long {
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
        
        return totalSteps
    }
}