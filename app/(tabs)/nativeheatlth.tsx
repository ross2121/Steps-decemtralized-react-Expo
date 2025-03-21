import React, { useEffect } from 'react';
import { 
  getGrantedPermissions, 
  initialize, 
  readRecords, 
  requestPermission,
} from 'react-native-health-connect';
import { Alert, Button, Platform, View, Text,Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
const InitializeHealthConnect = () => {
  const handleButtonPress = async () => {
    try {
      const isInitialized = await initialize();
      console.log({ isInitialized });
      const isInstalled = await Linking.canOpenURL(`healthconnect://`);
      // if(!isInstalled){
      //   await Linking.openURL("https://play.google.com/store/apps/details?id=com.google.android.apps.healthdata");
      //   return;
      // }
      const permisdsions=  await requestPermission([
        { accessType: 'read', recordType: 'Steps' },
      { accessType: 'read', recordType: 'Distance' },
      { accessType: 'read', recordType: 'FloorsClimbed' },
      ]);
      if(permisdsions){
        router.push("/(tabs)")
      }
      const permissions = await getGrantedPermissions();
      
      if(permissions.length==0){
         console.log("no permission")
      }
      console.log('Granted permissions:', permissions);
     
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
