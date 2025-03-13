import React, { useEffect } from 'react';
import { 
  getGrantedPermissions, 
  initialize, 
  readRecords, 
  requestPermission,
} from 'react-native-health-connect';
import { Alert, Button, Platform, View, Text,Linking } from 'react-native';
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
      const isInstalled = await Linking.canOpenURL(`healthconnect://`);
      // if(!isInstalled){
      //   await Linking.openURL("https://play.google.com/store/apps/details?id=com.google.android.apps.healthdata");
      //   return;
      // }
          await requestPermission([
        { accessType: 'read', recordType: 'Steps' },
      { accessType: 'read', recordType: 'Distance' },
      { accessType: 'read', recordType: 'FloorsClimbed' },
      ]);
      const readSampleData = () => {
        const now = new Date(); 
        const fiveMinutesAgo = new Date(now.getTime() - 24*60* 60 * 1000); 
      
        const startTime = fiveMinutesAgo.toISOString();
        const endTime = now.toISOString();
        readRecords('Steps', {
          timeRangeFilter: {
            operator: 'between',
             startTime: startTime,
            endTime:endTime
          },
        }).then(({ records }) => {
          // @ts-ignore
          const count=records.records.count;
          console.log("steps",JSON.stringify({count}));
          console.log('Retrieved records: ', JSON.stringify({ records }, null, 2)); 
        });
      };
      readSampleData();
      
      const permissions = await getGrantedPermissions();
      console.log('Granted permissions:', permissions);

      Alert.alert("Permissions granted!");
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
