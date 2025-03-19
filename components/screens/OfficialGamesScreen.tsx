import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OfficialGamesScreen = () => {
  const games = [
    {
      id: 1,
      title: "Game1",
      entryPrice: "2",
      time: "10/3-16/03",
      participants: "83",
      dailySteps: "12k",
    },
    {
      id: 2,
      title: "Game2",
      entryPrice: "2",
      time: "10/3-16/03",
      participants: "83",
      dailySteps: "12k",
    },
    {
      id: 3,
      title: "Game 3",

      entryPrice: "2",
      time: "10/3-16/03",
      participants: "83",
      dailySteps: "12k",
    },
    {
      id: 4,
      title: "Game 4",

      entryPrice: "2",
      time: "10/3-16/03",
      participants: "83",
      dailySteps: "12k",
    },
    {
      id: 5,
      title: "Game 5",

      entryPrice: "2",
      time: "10/3-16/03",
      participants: "83",
      dailySteps: "12k",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#1a0033", "#4b0082", "#290d44"]}
        style={styles.gradient}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          //   showsVerticalScrollIndicator={false}
        >
          {games.map((game) => (
            <View key={game.id} style={styles.gameCard}>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={styles.gameHeader}>{game.title}</Text>
                </View>
                <View>
                  <TouchableOpacity style={styles.joinbutton}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                      }}
                    >
                      Join
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "90%",
                    height: 0.5,

                    marginTop: 20,
                    backgroundColor: "#e5ccff",
                  }}
                />
              </View>
              <View>
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 5,
                  }}
                >
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <View>
                      <Text style={{ color: "#bfbfbf", fontSize: 12 }}>
                        Entry
                      </Text>
                    </View>
                    <View>
                      <Text style={{ color: "white", fontSize: 13 }}>
                        {game.entryPrice}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <View>
                      <Text style={{ color: "#bfbfbf", fontSize: 12 }}>
                        7 days
                      </Text>
                    </View>
                    <View>
                      <Text style={{ color: "white", fontSize: 13 }}>
                        {game.time}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <View>
                      <Text style={{ color: "#bfbfbf", fontSize: 12 }}>
                        Daily Steps
                      </Text>
                    </View>
                    <View>
                      <Text style={{ color: "white", fontSize: 13 }}>
                        {game.dailySteps}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <View>
                      <Text style={{ color: "#bfbfbf", fontSize: 12 }}>
                        Players
                      </Text>
                    </View>
                    <View>
                      <Text style={{ color: "white", fontSize: 13 }}>
                        {game.participants}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  gameCard: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 10,

    marginTop: 20,
    marginHorizontal: 20,

    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingBottom: 40,
    overflow: "hidden",
  },
  gameHeader: {
    color: "white",
    fontSize: 23,
    fontWeight: "bold",
  },
  joinbutton: {
    backgroundColor: "#783887",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OfficialGamesScreen;
