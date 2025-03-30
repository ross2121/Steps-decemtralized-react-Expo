// batteryOptimization.js
import { Platform, Linking, Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import AndroidOpenSettings from 'react-native-android-open-settings';

export const BatteryOptimization = {
  /**
   * Checks if battery optimization is disabled for the app
   * Note: This is an approximation since we can't directly check without native code
   */
  async isBatteryOptimizationDisabled() {
    if (Platform.OS !== 'android') return true;
    
    // This is a placeholder - in a real app you might track user's preference
    // or use a workaround like checking if your background service is running
    return false;
  },

  /**
   * Requests user to disable battery optimization
   */
  async requestDisableBatteryOptimization() {
    if (Platform.OS !== 'android') return;

    try {
      // Open battery optimization settings directly
      await AndroidOpenSettings.batteryOptimizationSettings();
    } catch (error) {
      console.error('Failed to open battery settings:', error);
      // Fallback to generic battery settings
      Linking.openSettings();
    }
  },

  /**
   * Shows an educational alert about battery optimization
   */
  showBatteryOptimizationAlert() {
    Alert.alert(
      'Battery Optimization',
      'For reliable background operation, please disable battery optimization for this app in your device settings.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open Settings',
          onPress: () => this.requestDisableBatteryOptimization(),
        },
      ],
      { cancelable: false }
    );
  },

  /**
   * Checks and prompts if battery optimization is enabled
   */
  async checkAndPromptBatteryOptimization() {
    if (Platform.OS !== 'android') return true;
    
    const isDisabled = await this.isBatteryOptimizationDisabled();
    if (!isDisabled) {
      this.showBatteryOptimizationAlert();
    }
    return isDisabled;
  }
};