import CommunityGamesScreen from "@/components/screens/CommunityGamesScreen";

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const OfficialGames = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CommunityGamesScreen />
    </GestureHandlerRootView>
  );
};

export default OfficialGames;
