import AsyncStorage from "@react-native-async-storage/async-storage";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View,Text, Alert } from "react-native";
import React from "react";
const Wallet=()=>{
    const[balance,setbalace]=useState(0);
    useEffect(()=>{
        console.log("hek");
         const Wallet=async()=>{
        
            const  publickey=await AsyncStorage.getItem("PublicKey");
            if(!publickey){
                Alert.alert("No public key found");
                return;
            }
            const connection=new Connection("https://api.devnet.solana.com");
            const spl=await connection.requestAirdrop(new PublicKey(publickey),LAMPORTS_PER_SOL*2);
             console.log(spl);
            const balanced=await connection.getBalance(new PublicKey(publickey));
            setbalace(balanced);
         } 
        Wallet(); 
    })
    return(
        <SafeAreaView>
            <View>
             <Text>Wallet</Text>
             <Text>{balance}</Text>  
            </View>
        </SafeAreaView>
    )
 
  
}
export default Wallet;