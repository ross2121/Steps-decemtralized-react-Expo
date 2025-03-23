import React, { useCallback, useRef, useMemo, useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Switch } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { BACKEND_URL } from "@/Backendurl";


const [data,setdata]=useState([{
  id:1,
  username:"",
  avatar:
  "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
  steps:""
}])

export default function LeaderboardScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const[error,seterror]=useState("");
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
 useEffect(()=>{
  const fetchdata=async()=>{
    try{
      const response= await axios.get(`${BACKEND_URL}/total/steps`)
      console.log(response.data);
      setdata(response.data.data);
}
catch(e:any){
  seterror(e)
}
  }
  fetchdata();
   
 })
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%", "53%", "75%"], []);
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
            data={data}
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
