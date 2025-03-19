import LeaderboardScreen from "@/components/screens/LeaderboardScreen";
import React from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const leaderboard = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <NavigationContainer> */}
      <LeaderboardScreen />
      {/* </NavigationContainer> */}
    </GestureHandlerRootView>
  );
};

export default leaderboard;
