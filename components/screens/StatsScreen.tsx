import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Bell } from "react-native-feather";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface Data {
  day: string;
  steps: number;
  date: string;
}

const ActivityBar = ({
  day,
  steps,
  maxSteps,
  onHover,
}: {
  day: string;
  steps: number;
  maxSteps: number;
  onHover: (steps: number) => void;
}) => {
  const animatedHeight = useSharedValue(0);

  useEffect(() => {
    animatedHeight.value = withTiming((steps / maxSteps) * 100, {
      duration: 1000,
    });
  }, [steps]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: `${animatedHeight.value}%`,
  }));

  return (
    <View style={styles.barContainer}>
      <TouchableOpacity
        style={styles.barWrapper}
        onPress={() => onHover(steps)}
      >
        <Animated.View style={[styles.bar, animatedStyle]} />
      </TouchableOpacity>
      <Text style={styles.dayText}>{day}</Text>
    </View>
  );
};

const StatCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <View style={styles.statCard}>
      <View style={styles.statCircle}>
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
};

const ActivityTracker = () => {
  const [stepData, setStepData] = useState<Data[]>([]);
  const [maxSteps, setMaxSteps] = useState(10000);
  const [selectedSteps, setSelectedSteps] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStepData = async () => {
      try {
        const userid = await AsyncStorage.getItem("userid");
        const response = await axios.post(
          "http://10.5.121.76:3000/api/v1/step/analysis",
          { id: "7a200fa4-9f3e-470f-b4d3-0b7d41d2ca2e" }
        );
        console.log(response.data);
        const formattedData = response.data.data.map((item: any) => ({
          day: item.day.substring(0, 3).toUpperCase(),
          steps: Number(item.steps),
          date: item.date,
        }));

        setStepData(formattedData);
        const max = Math.max(...formattedData.map((item) => item.steps), 10000);
        setMaxSteps(max);
      } catch (error) {
        console.error("Error fetching step data:", error);

        setMaxSteps(11000);
      } finally {
        setLoading(false);
      }
    };

    fetchStepData();
  }, []);

  // Calculate stats
  const totalSteps = stepData.reduce((sum, item) => sum + item.steps, 0);
  const stats = [
    { title: "Total steps", value: `${(totalSteps / 1000).toFixed(1)}k` },
    {
      title: "Active days",
      value: stepData.filter((item) => item.steps > 0).length,
    },
    { title: "Avg steps", value: `${Math.round(totalSteps / 7)}` },
  ];

  return (
    <LinearGradient
      colors={["#1a0033", "#4b0082", "#290d44"]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Stats</Text>
      </View>

      <LinearGradient
        colors={["#9C89FF", "#f8b8ff", "#7E3887"]}
        style={styles.contentContainer}
      >
        <Text style={styles.sectionTitle}>Activity</Text>

        {/* Steps display when a bar is selected */}
        {selectedSteps !== null && (
          <View style={styles.stepsDisplay}>
            <Text style={styles.stepsText}>
              {selectedSteps.toLocaleString()} steps
            </Text>
          </View>
        )}

        <View style={styles.chartContainer}>
          <View style={styles.yAxis}>
            {[10, 8, 6, 4, 2].map((num) => (
              <Text key={num} style={styles.yAxisLabel}>
                {num}k
              </Text>
            ))}
          </View>

          <View style={styles.chartContent}>
            {loading ? (
              // Show ActivityIndicator while loading
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: 20,
                }}
              >
                <ActivityIndicator size="large" color="#9C89FF" />
              </View>
            ) : (
              // Render ActivityBar when data is loaded
              stepData.map((item, index) => (
                <ActivityBar
                  key={index}
                  day={item.day}
                  steps={item.steps}
                  maxSteps={maxSteps}
                  onHover={(steps) => setSelectedSteps(steps)}
                />
              ))
            )}
          </View>
        </View>

        {/* Stats cards */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value.toString()}
            />
          ))}
        </View>
      </LinearGradient>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e2a3a",
  },
  loadingText: {
    color: "white",
    fontSize: 18,
  },
  stepsDisplay: {
    backgroundColor: "#1e2a3a",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  stepsText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#1e2a3a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  bellIcon: {
    padding: 8,
  },
  contentContainer: {
    flex: 1,

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e2a3a",
    marginBottom: 50,
  },
  chartContainer: {
    height: 300,
    backgroundColor: "#1e2a3a",
    borderRadius: 20,
    flexDirection: "row",
    paddingVertical: 20,
    paddingRight: 10,
  },
  yAxis: {
    width: 50,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  yAxisLabel: {
    color: "white",
    fontSize: 12,
  },
  chartContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    paddingLeft: 10,
  },
  barContainer: {
    alignItems: "center",
  },
  barWrapper: {
    width: 30,
    height: "90%",
    justifyContent: "flex-end",
  },
  bar: {
    width: "100%",
    backgroundColor: "#f8b8ff",
    borderRadius: 20,
  },
  dayText: {
    color: "white",
    fontSize: 12,
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  statCard: {
    width: "30%",
    backgroundColor: "#1e2a3a",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
  },
  statCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  statValue: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  statTitle: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
});

export default ActivityTracker;
