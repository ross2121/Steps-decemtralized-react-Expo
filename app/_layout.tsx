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
    </Stack>
  );
}
