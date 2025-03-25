
package com.youval21.StepsDecentralized

import HealthDataWorker
import expo.modules.splashscreen.SplashScreenManager
import android.os.Build
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import dev.matinzd.healthconnect.permissions.HealthConnectPermissionDelegate
import android.content.Context
import androidx.work.*
import java.util.concurrent.TimeUnit
import android.util.Log
import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.PermissionController
import androidx.health.connect.client.permission.HealthPermission
import androidx.health.connect.client.records.StepsRecord
import expo.modules.BuildConfig
import expo.modules.ReactActivityDelegateWrapper

class MainActivity : ReactActivity() {
    private lateinit var healthConnectClient: HealthConnectClient

    

    override fun onCreate(savedInstanceState: Bundle?) {
        SplashScreenManager.registerOnActivity(this)
        super.onCreate(savedInstanceState)
        scheduleDailyHealthDataSync(this)
        HealthConnectPermissionDelegate.setPermissionDelegate(this)
    }

   
    override fun getMainComponentName(): String = "main"

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return ReactActivityDelegateWrapper(
            this,
            BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
            object : DefaultReactActivityDelegate(
                this,
                mainComponentName,
                fabricEnabled
            ){}
        )
    }

    override fun invokeDefaultOnBackPressed() {
        if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
            if (!moveTaskToBack(false)) {
                super.invokeDefaultOnBackPressed()
            }
            return
        }
        super.invokeDefaultOnBackPressed()
    }

    private fun scheduleDailyHealthDataSync(context: Context) {
        val constraints = Constraints.Builder()
            .setRequiredNetworkType(NetworkType.CONNECTED)
            .build()
        val workManager = WorkManager.getInstance(context)
        Log.d("HealthDataSync", "Creating work request with constraints: Network = CONNECTED")
        val periodicWorkRequest = PeriodicWorkRequestBuilder<HealthDataWorker>(
            15,
            TimeUnit.MINUTES
        ).setConstraints(constraints)
            .build()
        Log.d("HealthDataSync", "Enqueuing work request...")

        workManager.enqueueUniquePeriodicWork(
            "HealthDataWorker",
            ExistingPeriodicWorkPolicy.UPDATE,
            periodicWorkRequest
        )

        Log.d("HealthDataSync", "Work request enqueued successfully.")
    }
}