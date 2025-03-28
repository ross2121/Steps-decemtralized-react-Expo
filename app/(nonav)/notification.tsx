import NotificationsScreen from "@/components/screens/NotificationsScreen";

import React from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Notification = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotificationsScreen />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({});

export default Notification;
