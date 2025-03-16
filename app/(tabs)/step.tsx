import { useEffect, useState } from "react";
import { View,Text } from "react-native";
import { getGrantedPermissions, readRecords } from "react-native-health-connect";
import {  SafeAreaView } from "react-native-safe-area-context";
import React from "react";
 const Stepcount=()=>{
    const [steps,setsteps]=useState(0);
    useEffect(()=>{
      const step=async()=>{
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
            console.log(recondr.records[0].count);
            let count=0;
            recondr.records.map((recod)=>count+=recod.count);
            setsteps(count);
    }
    step();
    })
          return(
           <SafeAreaView>
            <View>
              <Text>Total Steps</Text>
                <Text>{steps}</Text>
            </View>
           </SafeAreaView>
          )
}
export default Stepcount;