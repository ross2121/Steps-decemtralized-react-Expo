import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

const ProfileScreen = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  return (
    <BottomSheetModalProvider>
      <LinearGradient
        colors={["#1a0033", "#4b0082", "#290d44"]}
        style={styles.gradient}
      >
        <View>
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                marginTop: 15,
                marginLeft: 15,
                fontWeight: "bold",
              }}
            >
              Profile
            </Text>
            <View style={styles.profileCard}>
              <Image
                source={require("../../assets/images/profile.png")}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 50,
                  alignSelf: "center",
                }}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
                Username
              </Text>
            </View>
          </View>

          <View>
            <View style={styles.options}>
              <TouchableOpacity onPress={handlePresentModalPress}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                  }}
                >
                  Friends
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color="white"
                  style={{ position: "absolute", right: 10 }}
                />
              </TouchableOpacity>
              <BottomSheetModal
                snapPoints={snapPoints}
                ref={bottomSheetModalRef}
                onChange={handleSheetChanges}
                backdropComponent={(props) => (
                  <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                    opacity={0.9} // Adjust opacity for the blur effect
                  />
                )}
              >
                <BottomSheetView style={styles.contentContainer}>
                  <Text style={{ color: "black", fontSize: 18 }}>
                    Friends List 🎉
                  </Text>
                </BottomSheetView>
              </BottomSheetModal>
            </View>
            <View style={styles.options}>
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                }}
              >
                Socials
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="white"
                style={{ position: "absolute", right: 10 }}
              />
            </View>
            <View style={styles.options}>
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                }}
              >
                Step Provider
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="white"
                style={{ position: "absolute", right: 10 }}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  textAlign: "center",

                  fontWeight: "bold",
                }}
              >
                Logout
              </Text>
              <Ionicons
                name="log-out-outline"
                size={25}
                color="white"
                style={{ alignSelf: "center" }}
              />
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  profileCard: {
    backgroundColor: "#1a0226",
    marginHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 20,
    marginTop: 30,
  },
  options: {
    backgroundColor: "#1a0226",
    justifyContent: "center",
    marginTop: 10,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
  },
});
