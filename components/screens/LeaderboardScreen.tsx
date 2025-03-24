import React, { useCallback, useRef, useMemo, useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Switch } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { BACKEND_URL } from "@/Backendurl";

const data = [
  {
    id: "1",
    userName:"Soum",
    avatar:
      "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    totalXp: 1000,
    fitnessXp: 500,
  },
  {
    id: "2",
    userName:"Soum",
    avatar:
      "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    totalXp: 900,
    fitnessXp: 450,
  },
  {
    id: "3",
    userName:"Soum",
    avatar:
      "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    totalXp: 800,
    fitnessXp: 400,
  },
  {
    id: "4",
    userName:"Soum",
    avatar:
      "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    totalXp: 700,
    fitnessXp: 350,
  },
  {
    id: "5",
    userName:"Soum",
    avatar:
      "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    totalXp: 600,
    fitnessXp: 300,
  },
  {
    id: "6",
    userName:"Soum",
    avatar:
      "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    totalXp: 500,
    fitnessXp: 250,
  },
  {
    id: "7",
    userName:"Soum",
    avatar:
      "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    totalXp: 400,
    fitnessXp: 200,
  },
  {
    id: "8",
    userName:"Soum",
    avatar:
      "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    totalXp: 300,
    fitnessXp: 150,
  },
  {
    id: "9",
    userName:"Soum",
    avatar:
      "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    totalXp: 200,
    fitnessXp: 100,
  },
  {
    id: "10",
    userName:"Soum",
    avatar:
      "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    totalXp: 100,
    fitnessXp: 50,
  },
];
interface FORM{
  steps:string,
  username:string
  id:string,
  avatar:string
}

export default function LeaderboardScreen() {
  const [form,setform]=useState([{
    steps:"",
    username:""
  }])
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%", "53%", "75%"], []);

  const handleSheetChange = useCallback((index: any) => {
    console.log("handleSheetChange", index);
  }, []); 

  useEffect(()=>{
    const fetchstep=async()=>{
     try{const response=await axios.get(`${BACKEND_URL}/total/steps`)
      console.log(response.data.data);
      const formateddata=response.data.data.map((dat:any)=>({
        id: "1",
        username: dat.username,
        steps: dat.steps,
        avatar: "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg"
      }))
       setform(formateddata);
      }
       catch(e){
        console.log(e)
       }
    }
    fetchstep();
  },[])

  const renderItem = ({
    item,
    index,
  }: {
    item:FORM;
    index: number;
  }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.index}>{index + 1}</Text>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
  
        <Text style={styles.text}> {item.username}</Text>
      
        <Text style={styles.text}> {item.steps}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Background Content */}
      <LinearGradient
        colors={["#1a0033", "#4b0082", "#290d44"]}
        style={styles.gradient}
      >
        <View style={styles.backgroundContent}>
          <Text style={styles.text}>Background Content</Text>
          <Image
            source={require("../../assets/images/Run2.gif")}
            style={{ width: "100%", height: "40%" }}
          />
        </View>
      </LinearGradient>
      {/* Bottom Sheet */}
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
        animateOnMount={true}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetIndicator}
        style={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            backgroundColor: "#1a0033",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
            }}
          >
            <View style={{}}>
              <Text
                style={{
                  color: "white",
                  marginLeft: 20,
                  fontSize: 20,
                  fontWeight: "bold",
                  marginVertical: 15,
                }}
              >
                LeaderBoard
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  style={{ marginLeft: 20 }}
                />
                <Text
                  style={{
                    color: "white",
                    fontSize: 10,
                  }}
                >
                  Friends Only
                </Text>
              </View>
            </View>
          </View>

          {/* Headings */}
          <View style={styles.headings}>
            <Text style={styles.headingFont}>Rank</Text>
            <Text style={styles.headingFont}>Avatar</Text>
            <Text style={styles.headingFont}>User</Text>
            <Text style={styles.headingFont}>Fitness XP</Text>
          </View>

          {/* List of Items */}
          <BottomSheetFlatList
            data={form}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.contentContainer}
          />
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#1E2130",
  },
  backgroundContent: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#1a0033",
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  index: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFD700",
  },
  avatar: {
    width: 45,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  contentContainer: {
    paddingBottom: "100%",
  },
  headings: {
    flexDirection: "row",
    marginLeft:13,
    justifyContent: "space-around",
  },
  headingFont: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#bfbfbf",
    marginBottom: 10,
  },
  bottomSheetBackground: {
    backgroundColor: "#7E3887",
    borderRadius: 20,
  },
  bottomSheetIndicator: {
    backgroundColor: "#CCCCCC",
    width: 40,
    height: 5,
    borderRadius: 3,
  },
});
