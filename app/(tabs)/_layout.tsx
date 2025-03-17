import InitializeHealthConnect from "@/app/(tabs)/nativeheatlth";
import HomeScreen from "@/components/screens/HomeScreen";
import LeaderboardScreen from "@/components/screens/LeaderboardScreen";
import { Tabs } from "expo-router";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import Wallet from "@/components/screens/login";
import SolanaTransaction from "@/app/(tabs)/wallet";
import Stepcount from "@/app/(tabs)/step";
const Layout = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}>
      <Tabs.Screen
        name="Stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart-outline" size={24} color="black" />
          ),
        }}
      />
      {/* <Tab.Screen name="Leaderboard" component={LeaderboardScreen} /> */}
      {/* <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      <Tabs.Screen
        name="Wallet"
        options={{
          title: "WALLET",
          tabBarIcon: ({ color }) => (
            <Entypo name="wallet" size={24} color="black" />
          ),
        }}
      />
      {/* <Tab.Screen name="Profile" component={SolanaTransaction} /> */}
      {/* <Tab.Screen name="Wallets" component={Wallet} /> */}
      <Tabs.Screen
        name="step"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart-outline" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
};
export default Layout;
