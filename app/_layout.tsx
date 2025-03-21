import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  console.log("RootLayout rendered"); // Debugging line
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1a0033",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(nonav)/officialGames"
        options={{ title: "Official Games" }}
      />{" "}
      <Stack.Screen
        name="(nonav)/communityGames"
        options={{ title: "Community Games" }}
      />
      <Stack.Screen name="(nonav)/newGame" options={{ title: "Create Game" }} />
      <Stack.Screen
        name="(nonav)/historyGames"
        options={{ title: "History" }}
      />
      <Stack.Screen name="(auth)/welcome" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/login" options={{ title: "Login" }} />
      <Stack.Screen name="(auth)/signup" options={{ headerShown:false }} />
    </Stack>
  );
}
