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
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { BACKEND_URL } from "@/Backendurl";
import axios from "axios";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const CreateGameScreen = () => {
  const [form, setform] = useState({
    name: "",
    memberqty: 0,
    Dailystep: 0,
    Amount: 0,
    Digital_Currency: "sol",
    days: 0,
    startdate: format(new Date(), "yyyy-MM-dd").toString(),
    enddate: format(new Date(), "yyyy-MM-dd").toString(),
  });
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState<string | null>(null);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShow(false);
    setStartDate(currentDate);
    setform({ ...form, startdate: format(currentDate, "yyyy-MM-dd") });
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShow(false);
    setEndDate(currentDate);
    setform({ ...form, enddate: format(currentDate, "yyyy-MM-dd") });
  };

  const handleCreategame = async () => {
    setLoading(true);
    seterror(null);
    try {
      const response = await axios.post(
        `http://10.5.121.76:3000/api/v1/create/challenge`,
        {
          name: form.name,
          memberqty: form.memberqty,
          Dailystep:form.Dailystep,
          Amount: form.Amount,
          Digital_Currency: "sol",
          days: form.days,
          startdate:form.startdate,
          enddate: form.enddate,
          userid: await AsyncStorage.getItem("userid"),
        }
      );
      Alert.alert("Success", "Game Created Sucessfully");
      router.push("/(tabs)");
      console.log("Signup response:", response.data);
    } catch (err: any) {
      if (err instanceof Error && "response" in err) {
        console.log(err);
        const axiosError = err as { response: { data: { message: string } } };
        console.log(axiosError.response.data);
        seterror(
          axiosError.response.data.message ||
            "An error occurred. Please try again."
        );
      } else {
        console.log(err);
        seterror("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
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
                  onChangeText={(e) => {
                    setform({ ...form, name: e });
                  }}
                  keyboardType="name-phone-pad"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Members Quantity"
                  placeholderTextColor="#999"
                  onChangeText={(e) => {
                    setform({ ...form, memberqty: parseInt(e) });
                  }}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="DailySteps"
                  placeholderTextColor="#999"
                  onChangeText={(e) =>
                    setform({ ...form, Dailystep: parseInt(e) })
                  }
                  keyboardType="number-pad"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Amount"
                  placeholderTextColor="#999"
                  onChangeText={(e) => {
                    setform({ ...form, Amount: parseInt(e) });
                  }}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Days"
                  placeholderTextColor="#999"
                  onChangeText={(e) => {
                    setform({ ...form, days: parseInt(e) });
                  }}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={() => showMode('date')}>
                  <Text style={styles.dateButtonText}>Start Date: {format(startDate, "yyyy-MM-dd")}</Text>
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={startDate}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={handleStartDateChange}
                  />
                )}
              </View>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={() => showMode('date')}>
                  <Text style={styles.dateButtonText}>End Date: {format(endDate, "yyyy-MM-dd")}</Text>
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={endDate}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={handleEndDateChange}
                  />
                )}
              </View>
            

              {/* <View style={styles.inputContainer}> */}
             
            
              {/* </View> */}
           
            </View>
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleCreategame}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.signUpButtonText}>Create Tournament</Text>
              )}
            </TouchableOpacity>
            {error && (
              <View style={styles.container}>
                <Text style={styles.signUpButtonText}>{error}</Text>
              </View>
            )}
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
  dateButton: {
    padding: 10,
    backgroundColor: "rgba(30, 30, 30, 0.7)",
    borderRadius: 5,
    marginVertical: 5,
  },
  dateButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default CreateGameScreen;
