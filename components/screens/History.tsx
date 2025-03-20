import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const History = () => {
  const [selectedTab, setSelectedTab] = useState<"participated" | "created">(
    "participated"
  );
  const animatedValue = useRef(new Animated.Value(0)).current;
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

  return (
    <LinearGradient
      colors={["#1a0033", "#4b0082", "#8a2be2"]}
      style={styles.container}
    >
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity onPress={() => handleTabPress("participated")}>
            <View>
              <Text
                style={{
                  color: "white",
                }}
              >
                Participated
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabPress("created")}>
            <View>
              <Text
                style={{
                  color: "white",
                }}
              >
                {" "}
                Created
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* tab bar  */}
        <View style={styles.tabIndicatorContainer}>
          <Animated.View style={[styles.tabIndicator, animatedBarStyle]} />
        </View>

        {selectedTab === "participated" ? (
          <Text
            style={{
              color: "white",
              textAlign: "center",
            }}
          >
            Participated
          </Text>
        ) : (
          <Text
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            Created
          </Text>
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
});

export default History;
