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
    override suspend fun doWork(): Result {
        return withContext(Dispatchers.IO) {
            try {
                val steps = fetchStepsFromHealthConnect()
                val response = RetrofitClient.instance.sendSteps(StepsRequest(steps.toInt()))
                Result.success()
            } catch (e: Exception) {
                println("Error: ${e.message}")
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

        val response = healthConnectClient.readRecords(request)
        
        return response.records.sumOf { it.count }
    }
}