import { SafeAreaView } from "react-native-safe-area-context"
import React, { useState } from "react"
import { Button, Text, View,TextInput, Alert } from "react-native"
import { StyleSheet } from "react-native"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
const Friend=()=>{
    const [username,setUsername]=useState("");
     const Onclick=async()=>{
        try{const userid=await AsyncStorage.getItem("userid");
        const response=await axios.post("http://10.5.121.76:3000/api/v1/add/friend",{username:username,userid:userid});
        console.log(response.data); 
        }
      
        catch(e){
          console.log(e);
        }
     } 
return(
    <SafeAreaView>
        <View>
            <Text>
                Addusrernmae
            </Text>
            <TextInput 
             style={styles.input}
             placeholder="USername"
             onChangeText={setUsername}
             keyboardType="name-phone-pad"
             autoCapitalize="none"
            >

            </TextInput>
            <Button title="Add friend" onPress={()=>Onclick()}></Button>
        </View>
    </SafeAreaView>
)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
export default Friend
