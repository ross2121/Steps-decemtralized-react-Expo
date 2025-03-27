import LeaderboardScreen from "@/components/screens/LeaderboardScreen";
import Wallet from "@/components/screens/Wallet";
import { NavigationContainer } from "@react-navigation/native";
// import Wallets from "@/components/screens/Wallet2";
import React from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const wallet = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <NavigationContainer> */}
      <Wallet />
      {/* </NavigationContainer> */}
    </GestureHandlerRootView>
  );
};

export default wallet;
