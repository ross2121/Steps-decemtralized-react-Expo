import React, { useEffect } from "react";
import {
  getGrantedPermissions,
  initialize,
  readRecords,
  requestPermission,
} from "react-native-health-connect";
import {
  Alert,
  Button,
  Platform,
  View,
  Text,
  Linking,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
const InitializeHealthConnect = () => {
  const handleButtonPress = async () => {
    try {
      const isInitialized = await initialize();
      console.log({ isInitialized });
      const isInstalled = await Linking.canOpenURL(`healthconnect://`);
      // if(!isInstalled){
      //   await Linking.openURL("https://play.google.com/store/apps/details?id=com.google.android.apps.healthdata");
      //   return;
      // }
      const permisdsions = await requestPermission([
        { accessType: "read", recordType: "Steps" },
        { accessType: "read", recordType: "Distance" },
        { accessType: "read", recordType: "FloorsClimbed" },
      ]);
      if (permisdsions) {
        router.push("/(tabs)");
      }
      const permissions = await getGrantedPermissions();

      if (permissions.length == 0) {
        console.log("no permission");
      }
      console.log("Granted permissions:", permissions);
    } catch (error) {
      console.error("Error initializing Health Connect:", error);
      Alert.alert("Error", "Failed to initialize Health Connect.");
    }
  };
  return (
    <LinearGradient
      colors={["#1a0033", "#4b0082", "#290d44"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Connect Your Health Data</Text>
          <Text style={styles.smallText}>
            Sync your fitness data from supported health providers to get
            started.
          </Text>

          <View style={styles.providerContainer}>
            <TouchableOpacity onPress={handleButtonPress}>
              <View style={styles.providerItem}>
                <Image
                  source={require("../../assets/images/Healthconnect.png")}
                  style={styles.providerIcon}
                />
                <Text style={styles.providerText}>Health Connect</Text>
              </View>
            </TouchableOpacity>
            <Text
              style={[
                styles.providerText,
                { marginBottom: 20, alignSelf: "center" },
              ]}
            >
              Additionally Supporting Providers
            </Text>
            <TouchableOpacity onPress={handleButtonPress}>
              <View style={styles.providerItem}>
                {/* <MaterialIcons name="" size={32} color="#34A853" /> */}
                <Image
                  source={require("../../assets/images/googleFit.png")}
                  style={styles.providerIcon}
                />
                <Text style={styles.providerText}>Google Fit</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleButtonPress}>
              <View style={styles.providerItem}>
                <MaterialIcons name="apple" size={32} color="#000" />
                <Text style={styles.providerText}>Apple Health</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleButtonPress}>
              <View style={styles.providerItem}>
                <MaterialIcons name="watch" size={32} color="#1428A0" />
                <Text style={styles.providerText}>Samsung Health</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Text style={styles.buttonText}>Connect Now</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            By connecting, you agree to our
            <Text style={styles.linkText}>Terms of Service</Text> and{" "}
            <Text style={styles.linkText}>Privacy Policy</Text>.
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "90%",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  smallText: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 40,
  },
  providerContainer: {
    width: "100%",
    marginBottom: 40,
  },
  providerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
  },
  providerIcon: {
    width: 32,
    height: 32,
    marginRight: 15,
  },
  providerText: {
    fontSize: 18,
    color: "white",
  },
  button: {
    backgroundColor: "#8a2be2",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  footerText: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
  },
  linkText: {
    color: "#8a2be2",
    textDecorationLine: "underline",
  },
});

export default InitializeHealthConnect;
