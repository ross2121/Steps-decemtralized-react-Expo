import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import SlideButton from "rn-slide-button";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { initialize, readRecords } from "react-native-health-connect";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BACKEND_URL } from "@/Backendurl";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { set } from "date-fns";
import AppS from "@/components/screens/test";
const escrowpublickey = "AL3YQV36ADyq3xwjuETH8kceNTH9fuP43esbFiLF1V1A";
const App = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedGame, setSelectedGame] = useState(null);

  const connection = new Connection("https://api.devnet.solana.com");
  const snapPoints = useMemo(() => ["50%", "75%"], []);

  const handleJoinClick = useCallback((game: any) => {
    console.log("Join clicked for game:", game.title);
    setSelectedGame(game);
    bottomSheetModalRef.current?.present();
  }, []);

  const Onsend = async () => {
    try {
      const publickey = await AsyncStorage.getItem("PublicKey");
      if (!publickey) {
        Alert.alert("NO public key found");
        return;
      }
      const balance = await connection.getBalance(new PublicKey(publickey));
      console.log(selectedGame.Amount);
      if (balance < selectedGame.Amount * LAMPORTS_PER_SOL) {
        Alert.alert("Not enough credit");
        return;
      }
      console.log("chh");
      console.log(publickey);
      const signature = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(publickey),
          toPubkey: new PublicKey(escrowpublickey),
          lamports: LAMPORTS_PER_SOL * selectedGame.Amount,
        })
      );
      const { blockhash } = await connection.getLatestBlockhash();
      signature.recentBlockhash = blockhash;
      signature.feePayer = new PublicKey(publickey);
      const serilize = signature.serialize({
        requireAllSignatures: false,
        verifySignatures: false,
      });
      console.log("chekc1");
      const response = await axios.post(
        `${BACKEND_URL}/challenge/join/public/${selectedGame.id}`,
        { tx: serilize }
      );
      if (response.status == 200) {
        Alert.alert("ADDed to the contest");
      }
    } catch (e: any) {
      console.log(e);
      Alert.alert(e);
    }
  };
  const bottomSheetModalRef2 = useRef<BottomSheetModal>(null);
  const snapPoints2 = useMemo(() => ["30%"], []);
  const handleSearchGame = useCallback(() => {
    console.log("Search Game");
    bottomSheetModalRef2.current?.present();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        hidden={false}
        backgroundColor={"#1a0033"}
        barStyle={"light-content"}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <LinearGradient
            colors={["#1a0033", "#4b0082", "#290d44"]}
            style={styles.gradient}
          >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={{ padding: 5 }}>
                <StepsCount />
              </View>
              <View>
                <AppS />
              </View>
              <View>
                <OfficialGames handleJoinClick={handleJoinClick} />
              </View>
              <View>
                <CommunityGames handleJoinClick={handleJoinClick} />
              </View>
              <View>
                <JoinGame handleSearchGame={handleSearchGame} />
              </View>
            </ScrollView>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              snapPoints={snapPoints}
              backgroundStyle={styles.BottomSheetBackground}
              backdropComponent={(props) => (
                <BottomSheetBackdrop
                  {...props}
                  disappearsOnIndex={-1}
                  appearsOnIndex={0}
                  opacity={0.9}
                />
              )}
            >
              <BottomSheetView>
                {selectedGame ? (
                  <View
                    style={{
                      paddingHorizontal: 10,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#1a0033",
                        borderRadius: 20,
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                      }}
                    >
                      <Text style={styles.bottomSheetTitle}>
                        {selectedGame.name}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        You Pay: {selectedGame.Amount}
                      </Text>
                      {/* <View style={{ marginTop: 20 }}>
                        <Text
                          style={{
                            color: "white",
                            fontSize: 16,
                            marginBottom: 10,
                          }}
                        >
                          Slide to Confirm
                        </Text>
                        <View
                          style={{
                            backgroundColor: "#4b0082",
                            borderRadius: 50,
                            height: 50,
                            justifyContent: "center",
                            paddingHorizontal: 5,
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              backgroundColor: "#9C89FF",
                              borderRadius: 50,
                              height: 40,
                              width: 100,
                              justifyContent: "center",
                              alignItems: "center",
                              position: "absolute",
                              left: 5,
                            }}
                            onPress={() => console.log("Confirmed!")}
                          >
                            <Text
                              style={{ color: "white", fontWeight: "bold" }}
                            >
                              Confirm
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View> */}
                      <SlideButton
                        title="Slide To Confirm"
                        width="80%"
                        padding="2"
                        reverseSlideEnabled={false}
                        animation={true}
                        titleContainerStyle={{
                          backgroundColor: "#4b0082",
                        }}
                        containerStyle={{
                          backgroundColor: "#4b0082",
                        }}
                        underlayStyle={{
                          backgroundColor: "#1a0033",
                        }}
                        onSlideEnd={Onsend}
                        // height="30%"
                      />
                    </View>
                  </View>
                ) : (
                  <Text style={styles.bottomSheetTitle}>No Game Selected</Text>
                )}
              </BottomSheetView>
            </BottomSheetModal>

            <BottomSheetModal
              ref={bottomSheetModalRef2}
              snapPoints={snapPoints2}
              backgroundStyle={styles.BottomSheetBackground}
            >
              <BottomSheetView>
                <View>
                  <Text style={styles.bottomSheetTitle}>Search Game</Text>
                </View>
              </BottomSheetView>
            </BottomSheetModal>
          </LinearGradient>
        </BottomSheetModalProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const StepsCount = () => {
  const [error, seterror] = useState("");
  const [step, setstep] = useState(0);
  const Onsenddd = async () => {
    try {
      const userid = await AsyncStorage.getItem("userid");
      const response = await axios.post(`${BACKEND_URL}/regular/update`, {
        userid,
        steps: step,
      });
      console.log(response.data);
    } catch (e: any) {
      seterror(e);
    }
  };
  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const now = new Date();
        const midnightToday = new Date(now);
        midnightToday.setHours(0, 0, 0, 0);
        const startTime = midnightToday.toISOString();
        const endTime = now.toISOString();
        const isInitialized = await initialize();
        const { records } = await readRecords("Steps", {
          timeRangeFilter: {
            operator: "between",
            startTime: startTime,
            endTime: endTime,
          },
        });
        let count = 0;
        records.forEach((record) => {
          if (
            record.metadata?.dataOrigin === "com.google.android.apps.fitness"
          ) {
            count += record.count || 0;
          }
        });
        setstep(count);
      } catch (err) {
        console.error("Error fetching steps:", err);
        seterror("Failed to fetch steps. Please try again.");
      }
    };
    fetchSteps();
  });
  const usertarget = 5000;
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
          <Button title="Test" onPress={Onsenddd}></Button>

          <View style={styles.setpsdiv}>
            <Text style={styles.steptext}>{step}</Text>
            <Text style={{ color: "white", fontSize: 20 }}>/</Text>
            <Text style={styles.texttarget}>{usertarget}</Text>
            <Text
              style={{
                marginLeft: 5,
                color: "#9e9a99",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              steps
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
interface Game {
  id: 1;
  title: string;
  entryPrice: number;
  time: string;
  participants: number;
  dailySteps: number;
}

const OfficialGames = ({ handleJoinClick }: any) => {
  const [error, seterror] = useState("");
  const [form, setform] = useState([
    {
      name: "",
      memberqty: 0,
      Dailystep: 0,
      Totalamount: 0,
      Amount: 0,
      Digital_Currency: "sol",
      days: 0,
      startdate: "",
      enddate: "",
      id: "",
    },
  ]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/challenge/public`);
        console.log(response.data);
        setform(response.data.allchalange);
        console.log("response", response.data.allchalange);
      } catch (Error) {
        console.log(Error);
        // seterror(Error); r
      }
    };
    fetchdata();
  }, []);

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
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  return (
    <BottomSheetModalProvider>
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
            onPress={() => router.push("/(nonav)/officialGames")}
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.gamesScrollContent,
            games.length <= 4 && {
              alignSelf: "center",
              width: 1400,
              paddingRight: "40%",
              paddingLeft: 0,
            },
          ]}
        >
          {form.map((game) => (
            <View key={game.id} style={styles.gameCard}>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                }}
              >
                <View>
                  <Text style={styles.gameHeader}>{game.name}</Text>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.joinbutton}
                    onPress={() => handleJoinClick(game)}
                  >
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
                  <View style={{ alignItems: "center" }}>
                    <View>
                      <Text style={{ color: "#bfbfbf", fontSize: 12 }}>
                        Entry
                      </Text>
                    </View>
                    <View>
                      <Text style={{ color: "white", fontSize: 13 }}>
                        {game.Amount}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <View>
                      <Text style={{ color: "#bfbfbf", fontSize: 12 }}>
                        Days
                      </Text>
                    </View>
                    <View>
                      <Text style={{ color: "white", fontSize: 13 }}>
                        {game.days}
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
                        {game.Dailystep}
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
                        {game.memberqty}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </BottomSheetModalProvider>
  );
};

const CommunityGames = ({ handleJoinClick }: any) => {
  const [error, seterror] = useState("");
  const [form, setform] = useState([
    {
      name: "",
      memberqty: 0,
      Dailystep: 0,
      Totalamount: 0,
      Amount: 0,
      Digital_Currency: "sol",
      days: 0,
      startdate: "",
      enddate: "",
    },
  ]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const userid = await AsyncStorage.getItem("username");
        console.log(userid);
        const response = await axios.get(
          `https://decentrailzed-ttrack.vercel.app/api/v1/challenge/private/${userid}`
        );
        console.log(response.data);
        setform(response.data.allchalange);
        console.log("response", response.data.allchalange);
      } catch (Error) {
        console.log(Error);
        // seterror(Error); r
      }
    };
    fetchdata();
  }, []);

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
    // {
    //   id: 3,
    //   title: "Game 3",
    //   entryPrice: "2",
    //   time: "10/3-16/03",
    //   participants: "83",
    //   dailySteps: "12k",
    // },
    // {
    //   id: 4,
    //   title: "Game 4",
    //   entryPrice: "2",
    //   time: "10/3-16/03",
    //   participants: "83",
    //   dailySteps: "12k",
    // },
    // {
    //   id: 5,
    //   title: "Game 5",
    //   entryPrice: "2",
    //   time: "10/3-16/03",
    //   participants: "83",
    //   dailySteps: "12k",
    // },
  ];

  return (
    <View style={styles.gamesContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          // paddingRight: 16,
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
          onPress={() => router.push("/(nonav)/communityGames")}
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.gamesScrollContent,
          games.length <= 4 && {
            alignSelf: "center",
            width: 1400,
            paddingRight: "40%",
            paddingLeft: 0,
          },
        ]}
      >
        {form.map((game) => (
          <View key={game.name} style={styles.gameCard}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={styles.gameHeader}>{game.name}</Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.joinbutton}
                  onPress={() => handleJoinClick(game)}
                >
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
                      {game.Amount}
                    </Text>
                  </View>
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <View>
                    <Text style={{ color: "#bfbfbf", fontSize: 12 }}>Days</Text>
                  </View>
                  <View>
                    <Text style={{ color: "white", fontSize: 13 }}>
                      {game.days}
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
                      {game.Dailystep}
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
                      {game.memberqty}
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

const JoinGame = ({ handleSearchGame }) => {
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
          onPress={() => router.push("/(nonav)/historyGames")}
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
        <TouchableOpacity onPress={() => router.push("/(nonav)/newGame")}>
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
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSearchGame()}>
          <View style={styles.gamebttn}>
            <View>
              <FontAwesome6 name="magnifying-glass" size={24} color="white" />
            </View>
            <View>
              <Text style={styles.gamebttnText}>Game code</Text>
            </View>
          </View>
        </TouchableOpacity>
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
  gamesContainer: {
    marginVertical: 10,
    paddingLeft: 20,
    // width: 500,
  },
  gamesTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  gamesScrollContent: {
    paddingRight: "100%",
  },
  gameCard: {
    width: 300,
    height: 170,
    marginHorizontal: 10,
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    padding: 10,
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
  bottomSheetContent: {
    flex: 1,
    padding: 20,
  },
  bottomSheetTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 15,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#9C89FF",
    marginBottom: 20,
  },
  gameDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  gameDetailItem: {
    flex: 1,
    alignItems: "center",
  },
  gameDetailLabel: {
    color: "#bfbfbf",
    fontSize: 14,
    marginBottom: 5,
  },
  gameDetailValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  gameDescription: {
    marginTop: 10,
    marginBottom: 20,
  },
  gameDescriptionLabel: {
    color: "#bfbfbf",
    fontSize: 16,
    marginBottom: 10,
  },
  gameDescriptionText: {
    color: "white",
    fontSize: 14,
    lineHeight: 22,
  },
  joinGameButton: {
    backgroundColor: "#9C89FF",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  joinGameButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  BottomSheetBackground: {
    flex: 1,
    backgroundColor: "#7E3887",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default App;
