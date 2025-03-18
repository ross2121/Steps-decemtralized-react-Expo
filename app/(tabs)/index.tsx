import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  GestureHandlerRootView,
  NativeViewGestureHandler,
  ScrollView,
} from "react-native-gesture-handler";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const App = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={["#1a0033", "#4b0082", "#290d44"]}
          style={styles.gradient}
        >
          {/* Wrap content in ScrollView to make it vertically scrollable */}
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ padding: 5 }}>
              <StepsCount />
            </View>
            <View>
              <OfficialGames />
            </View>
            <View>
              <CommunityGames />
            </View>

            <View>
              <JoinGame />
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const StepsCount = () => {
  const usersetp = 0;
  const usertarget = 1000;
  return (
    <View>
      <View>
        <View style={styles.stepsCard}>
          <Text
            style={[
              styles.text,
              {
                fontSize: 15,
                marginBottom: 5,
                color: "#9e9a99",
              },
            ]}
          >
            Open Health Connect to sync
          </Text>
          <Text
            style={[
              styles.text,
              {
                color: "#9e9a99",
                fontSize: 12,
              },
            ]}
          >
            (wait for few minutes)
          </Text>
          <Image
            source={require("../../assets/images/sleep2.png")}
            style={{
              width: 170,
              height: 200,
              resizeMode: "contain",
              marginTop: 20,
            }}
          />
          <View style={styles.setpsdiv}>
            <Text style={styles.steptext}>{usersetp}</Text>
            <Text style={{ color: "white", fontSize: 20 }}>/</Text>
            <Text style={styles.texttarget}>{usertarget}</Text>
            <Text
              style={{
                marginLeft: 5,
                color: "#9e9a99",
                fontSize: 15,
                fontWeight: "bold", // Changed "heavy" to "bold" as "heavy" is not a valid fontWeight
              }}
            >
              {" "}
              steps
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const OfficialGames = () => {
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
    <View style={styles.gamesContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 16,
          marginBottom: 10,
        }}
      >
        <Text style={styles.gamesTitle}>Official Games</Text>
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Text style={{ color: "white" }}>All</Text>
            <AntDesign name="arrowright" size={15} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Horizontal ScrollView for games */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.gamesScrollContent}
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
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "90%",
                  height: 0.5,
                  marginTop: 15,
                  backgroundColor: "#e5ccff",
                }}
              />
            </View>
            <View>
              <View
                style={{
                  marginTop: 10,
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
    </View>
  );
};

const CommunityGames = () => {
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
    <View style={styles.gamesContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 16,
          marginBottom: 10,
        }}
      >
        <Text style={styles.gamesTitle}>Community Games</Text>
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Text style={{ color: "white" }}>All</Text>
            <AntDesign name="arrowright" size={15} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Horizontal ScrollView for games */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.gamesScrollContent}
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
    </View>
  );
};

const JoinGame = () => {
  return (
    <View
      style={{
        padding: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 16,
          marginBottom: 10,
        }}
      >
        <Text style={styles.gamesTitle}>Games</Text>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Text style={{ color: "white" }}>History</Text>
            <AntDesign name="arrowright" size={15} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 20,
          marginBottom: 10,
          paddingHorizontal: 35,
          borderRadius: 13,
        }}
      >
        <View
          style={[
            styles.gamebttn,
            {
              backgroundColor: "#9C89FF",
            },
          ]}
        >
          <View>
            <AntDesign name="plus" size={24} color="white" />
          </View>
          <View>
            <Text style={styles.gamebttnText}>New Game</Text>
          </View>
        </View>
        <View style={styles.gamebttn}>
          <View>
            <FontAwesome6 name="magnifying-glass" size={24} color="white" />
          </View>
          <View>
            <Text style={styles.gamebttnText}>Game code</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  steptext: {
    color: "white",
    fontSize: 50,
    marginRight: 10,
  },
  texttarget: {
    color: "white",
    fontSize: 30,
  },
  text: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
  setpsdiv: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  stepsCard: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 10,
    borderRadius: 10,
    margin: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  // New styles for OfficialGames component
  gamesContainer: {
    marginVertical: 10,
    paddingLeft: 20,
  },
  gamesTitle: {
    color: "white",
    fontSize: 22,

    fontWeight: "bold",
  },
  gamesScrollContent: {
    paddingRight: "50%",
  },
  gameCard: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 10,

    marginRight: 15,
    width: "22%",
    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingBottom: 40,
    overflow: "hidden",
  },
  gameImage: {
    width: 170,
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },
  gameTitle: {
    color: "#9e9a99",
    fontSize: 30,
    fontWeight: "bold",
  },

  //styles for game card
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

  //games create and join

  gamebttn: {
    backgroundColor: "#7E38B7",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 10,
  },
  gamebttnText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default App;
