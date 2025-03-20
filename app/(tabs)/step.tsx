import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { initialize, readRecords } from "react-native-health-connect";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React from "react";

const Step = () => {
  const [error, setError] = useState("");
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const userid = await AsyncStorage.getItem("userid");
        const now = new Date();
        const midnightToday = new Date(now);
        midnightToday.setHours(0, 0, 0, 0);
        const startTime = midnightToday.toISOString();
        const endTime = now.toISOString();
        const isInitialized = await initialize();
        console.log({ isInitialized });

        console.log("Fetching steps...");
        const { records } = await readRecords("Steps", {
          timeRangeFilter: {
            operator: "between",
            startTime: startTime,
            endTime: endTime,
          },
        });

        console.log("Retrieved records:", records);
        let count = 0;
        records.forEach((record) => {
          if (
            record.metadata?.dataOrigin === "com.google.android.apps.fitness"
          ) {
            count += record.count || 0;
          }
        });
        console.log("Total steps count:", count);
        setSteps(count);
      } catch (err) {
        console.error("Error fetching steps:", err);
        setError("Failed to fetch steps. Please try again.");
      }
    };

    fetchSteps();
  }, []);

  const sendSteps = async (steps: number) => {
    try {
      const userid = await AsyncStorage.getItem("userid");
      await axios.post("http://10.5.121.76:3000/api/v1/regular/update", {
        userid: userid,
        steps: steps,
      });
      console.log("Steps sent successfully");
    } catch (err) {
      if (err instanceof Error && "response" in err) {
        const axiosError = err as { response: { data: { message: string } } };
        setError(
          axiosError.response.data.message ||
            "An error occurred. Please try again."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Total Steps</Text>
        <Text>{steps}</Text>
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        <Button title="Send Steps" onPress={() => sendSteps(steps)} />
      </View>
    </SafeAreaView>
  );
};

export default Step;
