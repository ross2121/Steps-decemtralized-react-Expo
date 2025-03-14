import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    // Validate inputs
    if (!name || !username || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://decentrailzedttrack.onrender.com/api/v1/register", {
        name,
        username,
        email,
        password,
      });
      Alert.alert("Success", "Account created successfully");
      console.log("Signup response:", response.data);
    } catch (error:any) {
      if (error.response) {
        Alert.alert("Error", error.response.data.message || "An error occurred");
      } else if (error.request) {
        Alert.alert("Error", "No response from the server");
      } else {
        Alert.alert("Error", "An error occurred");
      }
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
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
          title={loading ? "Signing up..." : "Signup"}
          onPress={handleSignup}
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

export default Signup;