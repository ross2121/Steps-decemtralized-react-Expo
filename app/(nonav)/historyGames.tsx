import OfficialGamesScreen from "@/components/screens/OfficialGamesScreen";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const OfficialGames = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OfficialGamesScreen />
    </GestureHandlerRootView>
  );
};

export default OfficialGames;
