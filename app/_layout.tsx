import  InitializeHealthConnect  from "@/components/screens/nativeheatlth"
import HomeScreen from "@/components/screens/HomeScreen";
import LeaderboardScreen from "@/components/screens/LeaderboardScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";
import StatisticsScreen from "@/components/screens/StatisticsScreen";
import WalletScreen from "@/components/screens/WalletScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import App from "@/components/screens/WalletScreen";
import Wallet from "@/components/screens/WalletScreen";
import Signup from "@/components/screens/signup";
import Login from "@/components/screens/WalletScreen";
import SolanaTransaction from "@/components/screens/Sendtransaction";


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
      <Tab.Screen name="Profile" component={SolanaTransaction} />
      <Tab.Screen name="Wallets" component={Wallet} />
      <Tab.Screen name="Signup" component={Signup} />
      <Tab.Screen name="login" component={Login} />
    </Tab.Navigator>
  );
}
