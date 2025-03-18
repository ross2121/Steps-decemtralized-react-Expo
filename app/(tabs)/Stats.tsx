import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { router } from "expo-router";
import Wallet from "@/components/screens/Wallet";
const StatisticsScreen = () => {
  const Onclick = () => {
    console.log("challe");
    router.push("/(Challenge)/allchallenge");
  };
  return (
    <SafeAreaView>
      {/* <Text>Statistics</Text>
      <Text>Hello</Text>
      <Text>Hello2</Text>
      <Button title="All challenge" onPress={() => Onclick()}></Button> */}
      <Wallet />
    </SafeAreaView>
  );
};
export default StatisticsScreen;
