import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet,Text } from "react-native";
import axios from "axios";
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";

const SolanaTransaction = () => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [amount, setAmount] = useState(0);
  const [sign, setSign] = useState("");
  const [txn, setTxn] = useState("");
  const [signature, setSignature] = useState("");

  const connection = new Connection("https://api.devnet.solana.com");

  const sendTxn = async () => {
    try {
     
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

  const getTxn = async () => {
    try {
      // Fetch transaction status from the backend
      const response = await axios.post("http://localhost:3000/api/v1/status", {
        txn: txn,
      });

      // Set the signature from the response
      setSignature(response.data.ress.transaction.signatures[0]);
      console.log("Transaction Signature:", response.data.ress.transaction.signatures[0]);
    } catch (error) {
      console.error("Error fetching transaction status:", error);
      Alert.alert("Error", "Failed to fetch transaction status");
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
      <Button title="Get Transaction Status" onPress={getTxn} />
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