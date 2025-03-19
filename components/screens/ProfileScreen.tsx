import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";

const ProfileScreen = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedTab, setSelectedTab] = useState("friends");
  const animatedValue = useRef(new Animated.Value(0)).current;

  const friends = Array.from({ length: 50 }, (_, i) => ({
    id: `${i + 1}`,
    username: `User ${i + 1}`,
  }));

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
    Animated.timing(animatedValue, {
      toValue: tab === "friends" ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const animatedBarStyle = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 180],
        }),
      },
    ],
  };

  return (
    <BottomSheetModalProvider>
      <LinearGradient
        colors={["#1a0033", "#4b0082", "#290d44"]}
        style={styles.gradient}
      >
        <View>
          <Text style={styles.header}>Profile</Text>
          <View style={styles.profileCard}>
            <Image
              source={require("../../assets/images/profile.png")}
              style={styles.profileImage}
            />
            <Text style={styles.username}>Username</Text>
          </View>

          <TouchableOpacity onPress={handlePresentModalPress}>
            <View style={styles.options}>
              <Text style={styles.optionText}>Friends</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="white"
                style={styles.optionIcon}
              />
            </View>
          </TouchableOpacity>

          <BottomSheetModal
            snapPoints={snapPoints}
            ref={bottomSheetModalRef}
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
            <BottomSheetView style={styles.contentContainer}>
              <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => handleTabPress("friends")}>
                  <Text
                    style={[
                      styles.tabText,
                      selectedTab === "friends" && styles.activeTabText,
                    ]}
                  >
                    My friends
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress("search")}>
                  <Text
                    style={[
                      styles.tabText,
                      selectedTab === "search" && styles.activeTabText,
                    ]}
                  >
                    Search
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.tabIndicatorContainer}>
                <Animated.View
                  style={[styles.tabIndicator, animatedBarStyle]}
                />
              </View>

              {selectedTab === "friends" ? (
                <View style={{ flex: 1, marginTop: 20 }}>
                  <BottomSheetFlatList
                    data={friends}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <View style={styles.friendItem}>
                        <Text style={styles.friendText}>{item.username}</Text>
                      </View>
                    )}
                    contentContainerStyle={{ paddingBottom: 20, flex: 1 }}
                  />
                </View>
              ) : (
                <View style={styles.searchView}>
                  <Text style={styles.searchText}>
                    This is the "Search" view.
                  </Text>
                </View>
              )}
            </BottomSheetView>
          </BottomSheetModal>

          <TouchableOpacity>
            <View style={styles.options}>
              <Text style={styles.optionText}>Socials</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="white"
                style={styles.optionIcon}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.options}>
              <Text style={styles.optionText}>Step Provider</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="white"
                style={styles.optionIcon}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.logoutContainer}>
            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
              <Ionicons name="log-out-outline" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </BottomSheetModalProvider>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  header: {
    color: "white",
    fontSize: 20,
    marginTop: 15,
    marginLeft: 15,
    fontWeight: "bold",
  },
  profileCard: {
    backgroundColor: "#1a0226",
    marginHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 20,
    marginTop: 30,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    alignSelf: "center",
  },
  username: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 10,
  },
  options: {
    backgroundColor: "#1a0226",
    justifyContent: "center",
    marginTop: 10,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    flexDirection: "row",

    alignItems: "center",
  },
  optionText: {
    color: "white",
    fontSize: 15,
  },
  optionIcon: {
    position: "absolute",
    right: 10,
  },
  BottomSheetBackground: {
    flex: 1,
    backgroundColor: "#7E3887",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#1a0226",
    marginHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 13,
  },
  tabText: {
    color: "#9e9a99",
    fontSize: 13,
  },
  activeTabText: {
    color: "white",
  },
  tabIndicatorContainer: {
    marginTop: 20,
    width: "90%",
    height: 1,
    alignSelf: "center",
    position: "relative",
  },
  tabIndicator: {
    width: "45%",
    height: 1,
    backgroundColor: "green",
  },
  friendItem: {
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 12,
    backgroundColor: "#290d44",
  },
  friendText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  searchView: {
    marginTop: 20,
  },
  searchText: {
    color: "white",
    fontSize: 16,
  },
  logoutContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    flexDirection: "row",
    gap: 10,
  },
  logoutText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});
