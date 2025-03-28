import React from "react";
import {
  Button,
  PermissionsAndroid,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const requestPermissions = async () => {
  try {
    const permissionsToRequest = [];

    // Always include the standard permission
    permissionsToRequest.push(
      PermissionsAndroid.PERMISSIONS.READ_HEALTH_DATA_IN_BACKGROUND
    );

    if (Platform.OS === "android") {
      const healthPermissionAvailable = await PermissionsAndroid.check(
        "android.permission.health.READ_HEALTH_DATA_IN_BACKGROUND" as never
      );

      if (healthPermissionAvailable) {
        permissionsToRequest.push(
          "android.permission.health.READ_HEALTH_DATA_IN_BACKGROUND" as never
        );
      } else {
        console.log("Health Connect permission not available on this device.");
      }
    }

    const results = await PermissionsAndroid.requestMultiple(
      permissionsToRequest
    );

    const allGranted = Object.values(results).every(
      (result) => result === PermissionsAndroid.RESULTS.GRANTED
    );

    if (allGranted) {
      console.log("All permissions granted!");
    } else {
      console.log("Some permissions were denied:", results);
    }
  } catch (err) {
    console.warn("Error requesting permissions:", err);
  }
};

const AppS = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Text style={styles.item}>Request Permissions</Text>
      <Button title="Request Permissions" onPress={requestPermissions} />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AppS;
