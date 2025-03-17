import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import { Image } from "react-native";

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
    // console.log("handleSheetChange", index);
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
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.backgroundContent}>
        <Text style={styles.text}>Background Content</Text>
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
        animateOnMount={true}
      >
        <View
          style={{
            // marginBottom: 20,
            marginVertical: 18,
          }}
        >
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
        <View style={styles.headings}>
          <Text style={styles.headingFont}>Rank</Text>
          <Text style={styles.headingFont}>Avatar</Text>
          <Text style={styles.headingFont}>Total XP</Text>
          <Text style={styles.headingFont}>Fitness XP</Text>
        </View>
        <BottomSheetFlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  headingFont: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },
  headings: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 10,
  },
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
    backgroundColor: "#292B3A", // Darker background for list items
    padding: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    color: "white",
  },
  index: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700", // Gold color for ranking numbers
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
});
