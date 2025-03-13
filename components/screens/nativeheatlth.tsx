import React, { useEffect } from 'react';
import { 
  getGrantedPermissions, 
  initialize, 
  requestPermission 
} from 'react-native-health-connect';
import { Alert, Button, Platform, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const InitializeHealthConnect = () => {
  useEffect(() => {
    const checkHealthConnect = async () => {
      if (Platform.OS === 'android') {
        alert("Health Connect is available on Android.");
      } else {
        alert("Health Connect is not supported on this platform.");
      }
    };

    checkHealthConnect();
  }, []);

  const handleButtonPress = async () => {
    try {
      const isInitialized = await initialize();
      console.log({ isInitialized });

      const granted = await requestPermission([
        { accessType: 'read', recordType: 'Steps' },
      ]);

      if (granted.length > 0) {
        console.log("health granctes");
        alert("Permission Granted");
      } else {
        console.log("health deniser");
        alert("Permission Denied");
      }
        
      const permissions = await getGrantedPermissions();
      console.log('Granted permissions:', permissions);

      Alert.alert("Permissions granted!", JSON.stringify(permissions, null, 2));
    } catch (error) {
      console.error('Error initializing Health Connect:', error);
      Alert.alert('Error', 'Failed to initialize Health Connect.');
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Initialize Health Connect</Text>
        <Button title="Request Permission" onPress={handleButtonPress} />
      </View> 
    </SafeAreaView>
  );
};

export default InitializeHealthConnect;
