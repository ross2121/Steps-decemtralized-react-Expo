import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/signin", {
        email:email,
        password:password,
      });
      Alert.alert("Success", "Logged in successfully"); 
      await AsyncStorage.setItem("token",response.data.token);
      await AsyncStorage.setItem("username",response.data.user.username);
      await AsyncStorage.setItem("PublicKey",response.data.user.publickey);
      await AsyncStorage.setItem("userid",response.data.user.id);
      router.push("/(tabs)")
      console.log("Login response:", response.data);
    } catch (error:any) {
      if (error.response) {
        Alert.alert("Error", error.response.data.message || "An error occurred");
      } else if (error.request) {
        Alert.alert("Error", "No response from the server");
      } else {
        Alert.alert("Error", "An error occurred");
      }
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <Button
          title={loading ? "Logging in..." : "Login"}
          onPress={handleLogin}
          disabled={loading}
        />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default Login;