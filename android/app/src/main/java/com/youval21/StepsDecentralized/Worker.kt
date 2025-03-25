import AsyncStorageHelper
import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.content.pm.PackageManager
import android.net.Uri
import android.util.Log
import androidx.core.content.ContextCompat
import androidx.health.connect.client.PermissionController
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.permission.HealthPermission
import androidx.health.connect.client.records.StepsRecord
import androidx.health.connect.client.request.ReadRecordsRequest
import androidx.health.connect.client.permission.HealthPermission.Companion.PERMISSION_READ_HEALTH_DATA_IN_BACKGROUND

import androidx.health.connect.client.time.TimeRangeFilter
import com.youval21.StepsDecentralized.RetrofitClient
import com.youval21.StepsDecentralized.StepsRequest

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
                val asyncStorage = AsyncStorageHelper(applicationContext)
                val userId = asyncStorage.getAsyncStorageValue("userid")
                Log.d(TAG, "userid: $userId")
                if (userId != null) {
                    Log.d(TAG, userId)
                } else {
                    Log.d(TAG, "no user id")
                }
                val providerPackageName = "com.google.android.apps.fitness"
                val availabilityStatus = HealthConnectClient.getSdkStatus(applicationContext, providerPackageName)
                if (availabilityStatus == HealthConnectClient.SDK_UNAVAILABLE) {
                    return@withContext Result.failure()
                }
                if (availabilityStatus == HealthConnectClient.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED) {
                    val uriString = "market://details?id=$providerPackageName&url=healthconnect%3A%2F%2Fonboarding"
                    applicationContext.startActivity(
                        Intent(Intent.ACTION_VIEW).apply {
                            setPackage("com.android.vending")
                            data = Uri.parse(uriString)
                            putExtra("overlay", true)
                            putExtra("callerId", applicationContext.packageName)
                        }
                    )
                    return@withContext Result.failure()
                }

                val PERMISSIONS = setOf(
                    HealthPermission.getReadPermission(StepsRecord::class),
                    "android.permission.health.READ_HEALTH_DATA_IN_BACKGROUND"
                 )
                val healthConnectClient = HealthConnectClient.getOrCreate(applicationContext)
                val granted = healthConnectClient.permissionController.getGrantedPermissions()
                if (!granted.containsAll(PERMISSIONS)) {
                    val contract = PermissionController.createRequestPermissionResultContract()
                    val intent = contract.createIntent(applicationContext, PERMISSIONS)

                    Log.d(TAG, "PEermisir :${granted}");

                    applicationContext.startActivity(intent.apply {
                        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    })
                }
                Log.d(TAG, "PEermisir :${granted}");


                Log.d(TAG, "Starting HealthDataWorker...")
                val steps = fetchStepsFromHealthConnect()
                Log.d(TAG, "Fetched steps: $steps")
                val response = RetrofitClient.instance.sendSteps(
                    StepsRequest(steps.toString(), userId ?: "")
                )
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