import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const ProfileScreen = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedTab, setSelectedTab] = useState<"friends" | "search">(
    "friends"
  );
  const animatedValue = useRef(new Animated.Value(0)).current;

  const friends = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: `${i + 1}`,
        username: `User ${i + 1}`,
      })),
    []
  );
  const logout=async()=>{
  await AsyncStorage.removeItem("token")
   await AsyncStorage.removeItem("userid")
  await  AsyncStorage.removeItem("PublicKey")
  router.push("/");
  }
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const snapPoints = useMemo(() => ["30%", "50%"], []);

  const handleTabPress = (tab: "friends" | "search") => {
    setSelectedTab(tab);
    Animated.timing(animatedValue, {
      toValue: tab === "friends" ? 0 : 1,
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
    <BottomSheetModalProvider>
      <LinearGradient
        colors={["#1a0033", "#4b0082", "#290d44"]}
        style={styles.gradient}
      >
        <View>
          <Text style={styles.header}>Profile</Text>

          {/* Profile Info */}
          <View style={styles.profileCard}>
            <Image
              source={require("../../assets/images/profile.png")}
              style={styles.profileImage}
            />
            <Text style={styles.username}>Username</Text>
          </View>

          {/* Friends List */}
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

          {/* Bottom Sheet Modal */}
          <BottomSheetModal
            snapPoints={snapPoints}
            ref={bottomSheetModalRef}
            backgroundStyle={styles.bottomSheetBackground}
            backdropComponent={(props) => (
              <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.8}
              />
            )}
          >
            {/* Tabs */}
            <View style={styles.tabContainer}>
              <TouchableOpacity onPress={() => handleTabPress("friends")}>
                <View>
                  <Text
                    style={[
                      styles.tabText,
                      selectedTab === "friends" && styles.activeTabText,
                    ]}
                  >
                    My Friends
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleTabPress("search")}>
                <View>
                  <Text
                    style={[
                      styles.tabText,
                      selectedTab === "search" && styles.activeTabText,
                    ]}
                  >
                    Search
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Tab Indicator */}
            <View style={styles.tabIndicatorContainer}>
              <Animated.View style={[styles.tabIndicator, animatedBarStyle]} />
            </View>

            {/* Friends List or Search View */}
            {selectedTab === "friends" ? (
              <BottomSheetFlatList
                data={friends}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.friendItem}>
                    <Text style={styles.friendText}>{item.username}</Text>
                  </View>
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            ) : (
              <View style={styles.searchView}>
                <Text style={styles.searchText}>
                  Search feature coming soon...
                </Text>
              </View>
            )}
          </BottomSheetModal>

          {/* Other Options */}
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

          {/* Logout */}
          <View style={styles.logoutContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
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
  gradient: { flex: 1 },
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
    width: 100,
    height: 100,
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
    marginTop: 10,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: { color: "white", fontSize: 15 },
  optionIcon: { position: "absolute", right: 10 },
  bottomSheetBackground: {
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
  tabText: { color: "#9e9a99", fontSize: 13 },
  activeTabText: { color: "white", fontWeight: "bold" },
  tabIndicatorContainer: {
    marginTop: 10,
    width: "90%",
    height: 2,
    alignSelf: "center",
    backgroundColor: "#333",
    marginBottom: 30,
  },
  tabIndicator: { width: "45%", height: 2, backgroundColor: "green" },
  friendItem: {
    padding: 12,
    marginHorizontal: 20,

    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#290d44",
    alignItems: "center",
  },
  friendText: { color: "white", fontSize: 14 },
  searchView: { marginTop: 20, alignItems: "center" },
  searchText: { color: "white", fontSize: 16 },
  logoutContainer: { marginTop: 20, alignItems: "center" },
  logoutButton: { flexDirection: "row", gap: 10, alignItems: "center" },
  logoutText: { color: "white", fontSize: 15, fontWeight: "bold" },
});
