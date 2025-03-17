import { useEffect, useState } from "react";
import { View,Text, Button } from "react-native";
import { getGrantedPermissions, readRecords } from "react-native-health-connect";
import {  SafeAreaView } from "react-native-safe-area-context";
import  WebSocket  from "react-native-websocket";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
 const step=()=>{
    const [steps,setsteps]=useState(0);
    let userid:any
    useEffect(()=>{
      const step=async()=>{
        userid=await AsyncStorage.getItem("userid");
      const now = new Date(); 
      console.log("hey");
      const twoDaysAgo = new Date(now.getTime() -  24 * 60 * 60 * 1000);
      const startTime = twoDaysAgo.toISOString();
      const endTime = now.toISOString();
      console.log("chek");
       const permissions = await getGrantedPermissions();
       console.log("hek");
            if(permissions.length==0){
               console.log("no permission")
            }
            console.log('Granted permissions:', permissions);
            const recondr=await readRecords('Steps',{timeRangeFilter:{
              operator:'between',
              startTime:startTime,
              endTime:endTime
            }})
           ;
            console.log(recondr.records[0].count);
            let count=0;
            recondr.records.map((recod)=>count+=recod.count);
            setsteps(count);
    }
  
    step();
    },[])
    const sendSteps = (steps:any) => {
      const message = JSON.stringify({ userid, steps });
      this.webSocket.send(message);
  }
          return(
           <SafeAreaView>
             <WebSocket
                ref={(ref) => (this.webSocket = ref)}
                url="ws://10.5.121.76:4000"
                onOpen={() => console.log('WebSocket connected')}
                onMessage={(message) => console.log('Message from server:', message)}
                onError={(error) => console.error('WebSocket error:', error)}
                onClose={() => console.log('WebSocket closed')}
            />
            <View>
              <Text>Total Steps</Text>
                <Text>{steps}</Text>
                <Button
                title="Send Steps"
                onPress={() =>sendSteps(steps)}
            />
            </View>
           </SafeAreaView>
          )
}
export default step;