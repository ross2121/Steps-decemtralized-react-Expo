package com.youval21.stepsdecentralized
import HealthDataWorker
import expo.modules.splashscreen.SplashScreenManager
import android.os.Build
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import dev.matinzd.healthconnect.permissions.HealthConnectPermissionDelegate
import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import androidx.work.Constraints
import androidx.work.ExistingPeriodicWorkPolicy
import androidx.work.NetworkType
import androidx.work.PeriodicWorkRequest
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.PeriodicWorkRequestBuilder
import androidx.work.WorkManager
import java.util.Calendar
import java.util.concurrent.TimeUnit
import android.util.Log
import expo.modules.ReactActivityDelegateWrapper

class MainActivity : ReactActivity() {
<<<<<<< HEAD
    private lateinit var healthConnectClient: HealthConnectClient

    

=======
>>>>>>> b71217cacb060243dbaf02a3ac03996251872f21
    override fun onCreate(savedInstanceState: Bundle?) {
        // Set the theme to AppTheme BEFORE onCreate to support
        // coloring the background, status bar, and navigation bar.
        // This is required for expo-splash-screen.
        // setTheme(R.style.AppTheme);
        // @generated begin expo-splashscreen - expo prebuild (DO NOT MODIFY) sync-f3ff59a738c56c9a6119210cb55f0b613eb8b6af
        SplashScreenManager.registerOnActivity(this)
        super.onCreate(savedInstanceState)
        scheduleDailyHealthDataSync(this)
        HealthConnectPermissionDelegate.setPermissionDelegate(this)
        // @generated end expo-splashscreen
    }

<<<<<<< HEAD
   
=======
    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
>>>>>>> b71217cacb060243dbaf02a3ac03996251872f21
    override fun getMainComponentName(): String = "main"

    /**
     * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
     * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return ReactActivityDelegateWrapper(
            this,
            BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
            object : DefaultReactActivityDelegate(
                this,
                mainComponentName,
                fabricEnabled
            ){})
    }

    /**
     * Align the back button behavior with Android S
     * where moving root activities to background instead of finishing activities.
     * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
     */
    override fun invokeDefaultOnBackPressed() {
        if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
            if (!moveTaskToBack(false)) {
                // For non-root activities, use the default implementation to finish them.
                super.invokeDefaultOnBackPressed()
            }
            return
        }

        // Use the default back button implementation on Android S
        // because it's doing more than [Activity.moveTaskToBack] in fact.
        super.invokeDefaultOnBackPressed()
    }
    fun scheduleDailyHealthDataSync(context: Context) {
        val constraints = Constraints.Builder()
            .setRequiredNetworkType(NetworkType.CONNECTED)
            .build()

        Log.d("HealthDataSync", "Creating work request with constraints: Network = CONNECTED")
        val workManager = WorkManager.getInstance(context)
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