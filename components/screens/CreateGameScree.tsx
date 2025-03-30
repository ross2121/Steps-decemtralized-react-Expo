import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  Animated,
  ScrollView,
  FlatList,
  ToastAndroid,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import axios from "axios";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BACKEND_URL } from "@/Backendurl";

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
    request:[]
  });
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState<string | null>(null);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState<"public" | "community">(
    "public"
  );
  const animatedValue = useRef(new Animated.Value(0)).current;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [friend,setfriends]=useState([])
  useEffect(() => {
    seterror(null);
    if (selectedTab === "community") {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
    const fetchriend=async()=>{
      const userid=await AsyncStorage.getItem("userid");
      console.log(userid);
      const response = await axios.get(
        `${BACKEND_URL}/get/friends/${userid}`
      );
      console.log(response.data.user);
      setfriends(response.data.user);
    }
    fetchriend()
  }, [selectedTab]);
  const showMode = (currentMode:any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleStartDateChange = (event:any, selectedDate:any) => {
    const currentDate = selectedDate || startDate;
    setShow(false);
    setStartDate(currentDate);
    setform({ ...form, startdate: format(currentDate, "yyyy-MM-dd") });
  };

  const handleEndDateChange = (event:any, selectedDate:any) => {
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
        `${BACKEND_URL}/create/challenge`,
        {
          name: form.name,
          memberqty: form.memberqty,
          Dailystep: form.Dailystep,
          Amount: form.Amount,
          Digital_Currency: "sol",
          days: form.days,
          startdate: form.startdate,
          enddate: form.enddate,
          userid: await AsyncStorage.getItem("userid"),
        }
      );
      Alert.alert("Success", "Game Created Successfully");
      router.push("/(tabs)");
      console.log("Signup response:", response.data);
    } catch (err: any) {
      if (err instanceof Error && "response" in err) {
        // console.log(err);
        const axiosError = err as { response: { data: { message: string } } };
        // @ts-ignore
        console.log(axiosError.response.data.error[0].message);
        ToastAndroid.show(axiosError.response.data.error[0].message,ToastAndroid.LONG)
        // @ts-ignore
        seterror(
          axiosError.response.data.error[0].message ||
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
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleTabPress = (tab: "public" | "community") => {
    setSelectedTab(tab);
    Animated.timing(animatedValue, {
      toValue: tab === "public" ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const animatedBarStyle = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 202],
        }),
      },
    ],
  };

  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <LinearGradient
        colors={["#1a0033", "#4b0082", "#8a2be2"]}
        style={styles.container}
      >
        <BottomSheetModalProvider>
          <SafeAreaView style={styles.safeArea}>
            <View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                <TouchableOpacity onPress={() => handleTabPress("public")}>
                  <View>
                    <Text style={{ color: "white" }}>For Everyone</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress("community")}>
                  <View>
                    <Text style={{ color: "white" }}>For Community</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.tabIndicatorContainer}>
              <Animated.View style={[styles.tabIndicator, animatedBarStyle]} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.contentContainer}>
                {selectedTab === "public" ? (
                  <View>
                    <View style={styles.headerContainer}>
                      <Text style={styles.title}>
                        Create Challenge for Everyone
                      </Text>
                    </View>

                    <GameForm
                      form={form}
                      setform={setform}
                      loading={loading}
                      error={error}
                      startDate={startDate}
                      endDate={endDate}
                      show={show}
                      mode={mode}
                      showMode={showMode}
                      handleStartDateChange={handleStartDateChange}
                      handleEndDateChange={handleEndDateChange}
                      handleCreategame={handleCreategame}
                    />
                  </View>
                ) : (
                  <View>
                    <View style={styles.headerContainer}>
                      <Text style={styles.title}>
                        Create Challenge for Community
                      </Text>
                    </View>

                    <GameForm
                      form={form}
                      setform={setform}
                      loading={loading}
                      error={error}
                      startDate={startDate}
                      endDate={endDate}
                      show={show}
                      mode={mode}
                      showMode={showMode}
                      handleStartDateChange={handleStartDateChange}
                      handleEndDateChange={handleEndDateChange}
                      handleCreategame={handleCreategame}
                    />
                    <TouchableOpacity onPress={handlePresentModalPress}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 16,
                          textAlign: "center",
                        }}
                      >
                        Invite Friends
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </ScrollView>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={["25%", "50%", "70%"]}
              onChange={handleSheetChanges}
              handleIndicatorStyle={{
                backgroundColor: "#CCCCCC",
                width: 40,
                height: 5,
                borderRadius: 3,
              }}
              backgroundStyle={styles.bottomModalBackground}
              backdropComponent={(props) => (
                <BottomSheetBackdrop
                  {...props}
                  disappearsOnIndex={-1}
                  appearsOnIndex={0}
                  opacity={0.9}
                />
              )}
            >
              <BottomSheetView style={styles.bottomSheetContainer}>
                <Text style={styles.bottomSheetText}>Community Options</Text>
                <FlatList
        data={friend}
        keyExtractor={(item:any) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={(e:any) =>setform({...form,request:e.target})}
            >
              <View
                style={[
                  styles.radioButtonCircle,
                  friend === item.id && styles.radioButtonSelected,
                ]}
              />
            </TouchableOpacity>
            <Text style={styles.friendText}>{item}</Text>
          </View>
        )}
      />
              </BottomSheetView>
            </BottomSheetModal>
          </SafeAreaView>
        </BottomSheetModalProvider>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};
const GameForm = ({
  form,
  setform,
  loading,
  error,
  startDate,
  endDate,
  show,
  mode,
  showMode,
  handleStartDateChange,
  handleEndDateChange,
  handleCreategame,
}: any) => {
  return (
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
          onChangeText={(e) => setform({ ...form, Dailystep: parseInt(e) })}
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
          keyboardType="number-pad"
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
          keyboardType="number-pad"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => showMode("date")}>
          <Text style={styles.dateButtonText}>
            Start Date: {format(startDate, "yyyy-MM-dd")}
          </Text>
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
        <TouchableOpacity onPress={() => showMode("date")}>
          <Text style={styles.dateButtonText}>
            End Date: {format(endDate, "yyyy-MM-dd")}
          </Text>
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

      {error && (
        <View style={styles.container}>
          <Text style={styles.signUpButtonText}>{error}</Text>
        </View>
      )}
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
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  radioButtonCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "transparent",
  },
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  radioButtonSelected: {
    backgroundColor: "#4CAF50",
  },
  friendText: {
    fontSize: 16,
    color: "#333",
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
  dateButtonText: {
    color: "white",
    fontSize: 16,
  },
  tabIndicator: {
    width: "45%",
    height: 2,
    backgroundColor: "green",
  },
  tabIndicatorContainer: {
    marginTop: 10,
    width: "90%",
    height: 2,
    alignSelf: "center",
    backgroundColor: "#333",
  },
  bottomSheetContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  bottomSheetText: {
    fontSize: 16,
    color: "#333",
  },
  bottomModalBackground: {
    flex: 1,
    backgroundColor: "#7E3887",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default CreateGameScreen;
