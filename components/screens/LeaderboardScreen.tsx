import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Image, SafeAreaView, Modal } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

const data = [
  {
    id: "1",
    avatar:
      "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    totalXp: 1000,
    fitnessXp: 500,
  },
  {
    id: "2",
    avatar:
      "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    totalXp: 900,
    fitnessXp: 450,
  },
  {
    id: "3",
    avatar:
      "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    totalXp: 800,
    fitnessXp: 400,
  },
  {
    id: "4",
    avatar:
      "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    totalXp: 700,
    fitnessXp: 350,
  },
  {
    id: "5",
    avatar:
      "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    totalXp: 600,
    fitnessXp: 300,
  },
  {
    id: "6",
    avatar:
      "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    totalXp: 500,
    fitnessXp: 250,
  },
  {
    id: "7",
    avatar:
      "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    totalXp: 400,
    fitnessXp: 200,
  },
  {
    id: "8",
    avatar:
      "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    totalXp: 300,
    fitnessXp: 150,
  },
  {
    id: "9",
    avatar:
      "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    totalXp: 200,
    fitnessXp: 100,
  },
  {
    id: "10",
    avatar:
      "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    totalXp: 100,
    fitnessXp: 50,
  },
];



export default function LeaderboardScreen() {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "97%"], []);

  const handleSheetChange = useCallback((index: any) => {
    console.log("handleSheetChange", index);
  }, []);

  const renderItem = ({
    item,
    index,
  }: {
    item: { id: string; avatar: string; totalXp: number; fitnessXp: number };
    index: number;
  }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.index}>{index + 1}</Text>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={styles.text}> {item.totalXp}</Text>
        <Text style={styles.text}> {item.fitnessXp}</Text>
      </View>
    );
  };

  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.container}>
      {/* Background Content */}
      <View style={styles.backgroundContent}>
        <Text style={styles.text}>Background Content</Text>
      </View>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
        animateOnMount={true}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetIndicator}
      >
        <View style={{ marginVertical: 18 }}>
          <Text
            style={{
              color: "black",
              alignSelf: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            LeaderBoard
          </Text>
        </View>

        {/* Headings */}
        <View style={styles.headings}>
          <Text style={styles.headingFont}>Rank</Text>
          <Text style={styles.headingFont}>Avatar</Text>
          <Text style={styles.headingFont}>Total XP</Text>
          <Text style={styles.headingFont}>Fitness XP</Text>
        </View>

        {/* List of Items */}
        <BottomSheetFlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
    </View>
  
  
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E2E",
  },
  backgroundContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#292B3A",
    padding: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  index: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
    marginRight: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  headings: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 10,
  },
  headingFont: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },
  bottomSheetBackground: {
    backgroundColor: "#FFFFFF", // Light background for the bottom sheet
    borderRadius: 20,
  },
  bottomSheetIndicator: {
    backgroundColor: "#CCCCCC", // Indicator color
    width: 40,
    height: 5,
    borderRadius: 3,
  },
});

