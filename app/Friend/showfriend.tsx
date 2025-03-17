import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Alert, Button } from "react-native";
import React from "react";
const Friend = () => {
  let userid: String | null;
  const [friend, setfriends] = useState([]);
  useEffect(() => {
    const Getfriend = async () => {
      userid = await AsyncStorage.getItem("userid");
      const response = await axios.get(
        `http://10.5.121.76:3000/api/v1/friend/request/${userid}`
      );
      setfriends(response.data.message);
    };
    Getfriend();
  });
  const Accept = async (username: string) => {
    const response = await axios.post(
      `http://10.5.121.76:3000/api/v1/accept/friend`,
      { username: username, userid: userid, bool: true }
    );
    Alert.alert(response.data);
  };
  const Reject = async (username: string) => {
    const response = await axios.post(
      `http://10.5.121.76:3000/api/v1/accept/friend`,
      { username: username, userid: userid, bool: false }
    );
    Alert.alert(response.data);
  };

  return (
    <SafeAreaView>
      {friend.map((fr) => (
        <View key={fr}>
          <Text>{fr}</Text>
          <Button title="Acccept" onPress={() => Accept(fr)}></Button>
          <Button title="Reject" onPress={() => Reject(fr)}></Button>
        </View>
      ))}
      <View>
        <Text>Friend</Text>
      </View>
    </SafeAreaView>
  );
};
export default Friend;
