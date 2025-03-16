import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { router } from "expo-router";
export default function StatisticsScreen() {
  const Onclick=()=>{
    console.log("challe");
      router.push("/(Challenge)/allchallenge")
  }
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text>Statistics</Text>
      <Text>Hello</Text>
      <Button title="All challenge" onPress={()=>Onclick()}></Button>
    </SafeAreaView>
  );
}
