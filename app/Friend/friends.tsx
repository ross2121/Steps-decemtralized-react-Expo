import { SafeAreaView } from "react-native-safe-area-context";
import React, { useMemo, useRef, useState } from "react";
import { Button, Text, View, TextInput, Alert } from "react-native";
import { StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheet from "@gorhom/bottom-sheet";

const Friend = () => {
  const [username, setUsername] = useState("");
  const Onclick = async () => {
    try {
      const userid = await AsyncStorage.getItem("userid");
      const response = await axios.post(
        "http://10.5.121.76:3000/api/v1/add/friend",
        { username: username, userid: userid }
      );
      console.log(response.data);
      Alert.alert("Success", "Friend added successfully");
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Failed to add friend");
    }
  };

  const snapPoints = useMemo(() => ["50%", "97%"], []);
  const sheetRef = useRef<BottomSheet>(null);

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        animateOnMount={true}
      >
        <View style={styles.modalView}>
          <Text>Add Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={setUsername}
            keyboardType="name-phone-pad"
            autoCapitalize="none"
          />
          <Button title="Add friend" onPress={() => Onclick()} />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "100%",
  },
});

export default Friend;
