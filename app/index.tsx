import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";

const StartPage = () => {
  const [auth, setauth] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const Auth = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('token');
  //       console.log("Token found:", token);
  //       if (token) {
  //         setauth(true);
  //       } else {
  //         setauth(false);
  //       }
  //     } catch (error) {
  //       console.error("Auth error:", error);
  //       setauth(false);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   Auth();
  // }, []);

  // if (loading) {
  //   return <ActivityIndicator />;
  // }

  return (
    <>
      {/* {auth ? (
        <Redirect href="/(tabs)" />
      ) : (
        <Redirect href="/(auth)/test" />
      )} */}
      <Redirect href="/(tabs)" />
    </>
  );
};

export default StartPage;
