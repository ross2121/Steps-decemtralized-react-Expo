import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  console.log("RootLayout rendered"); // Debugging line
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
