import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "@/Backendurl";

const History = () => {
  // Dummy data for the history
  const [form, setform] = useState([
    {
      id: "1",
      name: "Tournament 1",
      memberqty: 10,
      Dailystep: 5000,
      Totalamount: 1000,
      Amount: 100,
      Digital_Currency: "sol",
      days: 7,
      startdate: "2023-10-01",
      enddate: "2023-10-07",
    },
    {
      id: "2",
      name: "Tournament 2",
      memberqty: 15,
      Dailystep: 7000,
      Totalamount: 1500,
      Amount: 150,
      Digital_Currency: "sol",
      days: 10,
      startdate: "2023-10-10",
      enddate: "2023-10-20",
    },
    {
      id: "3",
      name: "Tournament 3",
      memberqty: 20,
      Dailystep: 10000,
      Totalamount: 2000,
      Amount: 200,
      Digital_Currency: "sol",
      days: 14,
      startdate: "2023-10-25",
      enddate: "2023-11-08",
    },
    {
      id: "4",
      name: "Tournament 3",
      memberqty: 20,
      Dailystep: 10000,
      Totalamount: 2000,
      Amount: 200,
      Digital_Currency: "sol",
      days: 14,
      startdate: "2023-10-25",
      enddate: "2023-11-08",
    },
  ]);
  const[participated,setparticipated]=useState([
    {
      id: "1",
      name: "Tournament 1",
      memberqty: 10,
      Dailystep: 5000,
      Totalamount: 1000,
      Amount: 100,
      Digital_Currency: "sol",
      days: 7,
      startdate: "2023-10-01",
      enddate: "2023-10-07",
    },
  ]);

  const [selectedTab, setSelectedTab] = useState<"participated" | "created">(
    "participated"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [participatedData, setParticipatedData] = useState([]);
  const [createdData, setCreatedData] = useState([]);
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userid = await AsyncStorage.getItem("userid");
        if (!userid) {
          setError("User ID not found.");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          `${BACKEND_URL}/history/prevgame/${userid}`
        ); 
         const previeoudata=await axios.get(
          `${BACKEND_URL}/history/prev/${userid}`
         )
          setparticipated(previeoudata.data.Tournament);
          console
        setform(response.data.Tournament);
        console.log(response.data)
      } catch (e) {
        console.error("Error fetching history:", e);
        setError("Failed to fetch history. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);
  const handleTabPress = (tab: "participated" | "created") => {
    setSelectedTab(tab);
    Animated.timing(animatedValue, {
      toValue: tab === "participated" ? 0 : 1,
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

  const Item = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Name: {item.name}</Text>
      <Text style={styles.text}>Members: {item.memberqty}</Text>
      <Text style={styles.text}>Daily Steps: {item.Dailystep}</Text>
      <Text style={styles.text}>Total Amount: {item.Totalamount}</Text>
      <Text style={styles.text}>Amount: {item.Amount}</Text>
      <Text style={styles.text}>Currency: {item.Digital_Currency}</Text>
      <Text style={styles.text}>Days: {item.days}</Text>
      <Text style={styles.text}>Days: {item.status}</Text>
      <Text style={styles.text}>Start Date: {item.startdate}</Text>
      <Text style={styles.text}>End Date: {item.enddate}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#1a0033", "#4b0082", "#8a2be2"]}
      style={styles.container}
    >
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity onPress={() => handleTabPress("participated")}>
            <View>
              <Text style={{ color: "white" }}>Participated</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabPress("created")}>
            <View>
              <Text style={{ color: "white" }}>Created</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* tab bar  */}
        <View style={styles.tabIndicatorContainer}>
          <Animated.View style={[styles.tabIndicator, animatedBarStyle]} />
        </View>

        {selectedTab === "participated" ? (
          <View>
            <FlatList
              data={participated}
              scrollEnabled={true}
              style={{ marginBottom: 130 }}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginTop: 50,
                  }}
                >
                  No data found
                </Text>
              }
            />
          </View>
        ) : (
          <View>
            <FlatList
              data={form}
              scrollEnabled={true}
              style={{ marginBottom: 130 }}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginTop: 50,
                  }}
                >
                  No data found
                </Text>
              }
            />
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabIndicator: { width: "45%", height: 2, backgroundColor: "green" },
  tabIndicatorContainer: {
    marginTop: 10,
    width: "90%",
    height: 2,
    alignSelf: "center",
    backgroundColor: "#333",
    marginBottom: 30,
  },
  item: {
    backgroundColor: "#1a0033",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    color: "white",
  },
});

export default History;
