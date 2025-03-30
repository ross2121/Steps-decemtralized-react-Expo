import ActivityTracker from "@/components/screens/StatsScreen";
import React from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stats = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ActivityTracker />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({});

export default Stats;
