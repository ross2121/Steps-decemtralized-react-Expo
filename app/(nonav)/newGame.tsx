import CreateGameScreen from "@/components/screens/CreateGameScree";
import OfficialGamesScreen from "@/components/screens/OfficialGamesScreen";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const OfficialGames = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CreateGameScreen />
    </GestureHandlerRootView>
  );
};

export default OfficialGames;
