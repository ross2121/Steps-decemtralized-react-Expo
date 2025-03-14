import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet,Text } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, PUBLIC_KEY_LENGTH } from "@solana/web3.js";
import { serialize } from "v8";

const SolanaTransaction = () => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [amount, setAmount] = useState(0);
  const [sign, setSign] = useState("");
  const [txn, setTxn] = useState("");
  const [signature, setSignature] = useState("");
const topublickey="CqCqA2kbY4m3K9hUCt8UTvH7dizseiGgHcbcFCWdvZJJ";
  const connection = new Connection("https://api.devnet.solana.com");

  const sendTxn = async () => {
    try {
      const frompublickey=await AsyncStorage.getItem("PublicKey")
      console.log("");
      if(!frompublickey){
          Alert.alert("no publickey found");   
        
          return;
      }
      console.log("check 2");
      console.log(await AsyncStorage.getItem("username"))
      console.log(frompublickey);
      const transaction =new Transaction().add(
        SystemProgram.transfer(
          {
            fromPubkey:new PublicKey("AMLH95HnLpUsa14Q3pUA2eUAizLuoRPpeVowph1g7dJv"),
            toPubkey:new PublicKey(topublickey),
            lamports:LAMPORTS_PER_SOL
          }
        )
      )
      console.log("check 3");
      const {blockhash}=await connection.getLatestBlockhash();
      transaction.recentBlockhash=blockhash;
      transaction.feePayer=new PublicKey("AMLH95HnLpUsa14Q3pUA2eUAizLuoRPpeVowph1g7dJv");
      const serilze=transaction.serialize({
        requireAllSignatures:false,
        verifySignatures:false,
      })
      const decoded=Transaction.from(serilze);
      console.log(decoded);

      const balance=await connection.getAccountInfo(new PublicKey(to));
      if(balance){
      setSignature(balance.lamports.toString());
      }   
      Alert.alert("Success", "Transaction sent successfully");
    } catch (error) {
      console.error("Error sending transaction:", error);
      Alert.alert("Error", "Failed to send transaction");
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="From Public Key"
        value={from}
        onChangeText={setFrom}
      />
      <TextInput
        style={styles.input}
        placeholder="To Public Key"
        value={to}
        onChangeText={setTo}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount (in SOL)"
        value={amount.toString()}
        onChangeText={(text) => setAmount(parseFloat(text))}
        keyboardType="numeric"
      />
      <Button title="Send Transaction" onPress={sendTxn} />
      <TextInput
        style={styles.input}
        placeholder="Transaction ID"
        value={txn}
        onChangeText={setTxn}
      />
      <View style={styles.resultContainer}>
        <Text>Sign: {sign}</Text>
        <Text>Signature: {signature}</Text>
      </View>
    </View>
  );
};

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
  resultContainer: {
    marginTop: 20,
  },
});

export default SolanaTransaction;