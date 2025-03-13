import  InitializeHealthConnect  from "@/components/screens/nativeheatlth"
import HomeScreen from "@/components/screens/HomeScreen";
import LeaderboardScreen from "@/components/screens/LeaderboardScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";
import StatisticsScreen from "@/components/screens/StatisticsScreen";
import WalletScreen from "@/components/screens/WalletScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import App from "@/components/screens/WalletScreen";


const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        tabBarStyle: { backgroundColor: "#1e1e1e" },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#888888",
      }}
    >
      <Tab.Screen name="Stats" component={StatisticsScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="Wallet" component={InitializeHealthConnect} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
