import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import axios from "axios";

const CreateGameScreen = () => {
    const [form,setform]=useState({name:"",memberqty:0,Dailystep:0,Amount:0,Digital_Currency:"",days:0,startdata:"",enddate:""})
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#1a0033", "#4b0082", "#8a2be2"]}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Create Game </Text>
            </View>
     
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor="#999"
                  onChangeText={(e)=>{setform({...form,name:e})}} 
                  keyboardType="name-phone-pad"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Members Quantity"
                  placeholderTextColor="#999"
                  onChangeText={(e)=>{setform({...form,memberqty:parseInt(e)})}}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="DailySteps"
                  placeholderTextColor="#999"
                  onChangeText={(e)=>setform({...form,Dailystep:parseInt(e)})}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Amount"
                  placeholderTextColor="#999"
                  onChangeText={(e)=>{setform({...form,Amount:parseInt(e)})}}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
               
              </View>
              </View>
              <View style={styles.inputContainer}>
              <select onChange={(e)=>setform({...form,Digital_Currency:e.target.value})}>
     <option value="someOption">SoL</option>
    <option value="otherOption">Other option</option>
   </select>
              </View>
         
              <TouchableOpacity style={styles.signUpButton}>
                {loading ? (
                  <Button
                    title="Sign up"
                    // onPress={() => handleSignup()}
                  ></Button>
                ) : (
                  <Text>Signing up....</Text>
                )}
              </TouchableOpacity>

              <View style={styles.newUserContainer}>
                <Text style={styles.newUserText}>Already have an account </Text>
                <TouchableOpacity>
                  <Text style={styles.joinNowText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  headerContainer: {
    marginBottom: 40,
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#cccccc",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(30, 30, 30, 0.7)",
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
  },
  showButton: {
    paddingHorizontal: 10,
  },
  showButtonText: {
    color: "#cccccc",
    fontSize: 14,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#cccccc",
    fontSize: 14,
  },
  signUpButton: {
    backgroundColor: "#8a2be2",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  signUpButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  orText: {
    color: "#cccccc",
    paddingHorizontal: 10,
    fontSize: 14,
  },
  appleButton: {
    backgroundColor: "rgba(30, 30, 30, 0.7)",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  appleButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  appleIcon: {
    fontSize: 18,
  },
  newUserContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  newUserText: {
    color: "#cccccc",
    fontSize: 14,
  },
  joinNowText: {
    color: "gray",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default CreateGameScreen;
