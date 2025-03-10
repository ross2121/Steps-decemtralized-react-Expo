import "../global.css";
import React, { Component } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const index = () => {
  return (
    <SafeAreaView>
      <View>
        <Text className="text-red-400 text-2xl"> textInComponent </Text>
      </View>
    </SafeAreaView>
  );
};
export default index;
