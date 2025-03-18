import AsyncStorage from "@react-native-async-storage/async-storage";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Alert, Button } from "react-native";
import React from "react";
const Wallet = () => {
  const connection = new Connection(
    "https://solana-devnet.g.alchemy.com/v2/r25E3uMjQakYPLTlM3f9rNihLj8SlmE_"
  );
  const [balance, setbalace] = useState(0);
  const Onclick = async () => {
    const publickey = await AsyncStorage.getItem("PublicKey");
    if (!publickey) {
      Alert.alert("No public key found");
      return;
    }
    const spl = await connection.requestAirdrop(
      new PublicKey(publickey),
      LAMPORTS_PER_SOL * 1
    );
    console.log("chh");
    console.log(spl);
  };
  useEffect(() => {
    console.log("hek");
    const Wallet = async () => {
      const publickey = await AsyncStorage.getItem("PublicKey");
      if (!publickey) {
        Alert.alert("No public key found");
        return;
      }
      console.log(publickey);
      console.log("Check1");
      const balanced = await connection.getBalance(new PublicKey(publickey));
      console.log(balanced);
      setbalace(balanced);
    };
    Wallet();
  });
  return (
    // <SafeAreaView>
    //     <View>
    //      <Text>Wallet</Text>
    //      <Text>{balance}</Text>
    //      <Button title="Airdrop" onPress={()=>Onclick()}></Button>
    //     </View>
    // </SafeAreaView>
    <View>
      <Text>Wallet</Text>
      <Text>{balance}</Text>
      <Button title="Airdrop" onPress={() => Onclick()}></Button>
    </View>
  );
};
export default Wallet;
