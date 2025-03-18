import AsyncStorage from "@react-native-async-storage/async-storage";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Button,
  TouchableOpacity,
  StatusBar,
  Modal,
} from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Feather, Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
const TRANSACTIONS = [
  {
    id: "1",
    type: "received",
    amount: "+$250.00",
    date: "Mar 15, 2025",
    from: "John Doe",
  },
  {
    id: "2",
    type: "sent",
    amount: "-$120.50",
    date: "Mar 12, 2025",
    to: "Coffee Shop",
  },
  { id: "3", type: "swap", amount: "$75.00 → ETH", date: "Mar 10, 2025" },
  {
    id: "4",
    type: "received",
    amount: "+$500.00",
    date: "Mar 5, 2025",
    from: "Salary",
  },
  {
    id: "5",
    type: "sent",
    amount: "-$35.20",
    date: "Mar 3, 2025",
    to: "Grocery Store",
  },
  { id: "6", type: "swap", amount: "ETH → $42.75", date: "Feb 28, 2025" },
  {
    id: "7",
    type: "received",
    amount: "+$20.00",
    date: "Feb 25, 2025",
    from: "Friend",
  },
  {
    id: "8",
    type: "sent",
    amount: "-$15.99",
    date: "Feb 22, 2025",
    to: "Subscription",
  },
];
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
    const Wallets = async () => {
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
    Wallets();
  },[]);
  // Bottom sheet reference
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Variables for bottom sheet snap points
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  // Callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // Render transaction item
  const renderItem = useCallback(({ item }: any) => {
    const isPositive = item.type === "received";

    return (
      <View style={styles.transactionItem}>
        <View style={styles.transactionIconContainer}>
          {item.type === "received" ? (
            <Feather name="arrow-down-left" size={20} color="#4CD964" />
          ) : item.type === "sent" ? (
            <Feather name="arrow-up-right" size={20} color="#FF3B30" />
          ) : (
            <Feather name="repeat" size={20} color="#007AFF" />
          )}
        </View>

        <View style={styles.transactionDetails}>
          <Text style={styles.transactionTitle}>
            {item.type === "received"
              ? `From ${item.from}`
              : item.type === "sent"
              ? `To ${item.to}`
              : "Swap"}
          </Text>
          <Text style={styles.transactionDate}>{item.date}</Text>
        </View>

        <Text
          style={[
            styles.transactionAmount,
            {
              color:
                item.type === "received"
                  ? "#4CD964"
                  : item.type === "sent"
                  ? "#FF3B30"
                  : "#007AFF",
            },
          ]}
        >
          {item.amount}
        </Text>
      </View>
    );
  }, []);

  return (
    <Modal>
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        {/* Wallet Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Wallet</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Feather name="settings" size={24} color="#5EDCF5" />
          </TouchableOpacity>
        </View>

        {/* Balance Display */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>$0.00</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="plus" size={24} color="white" />
            <Text style={styles.actionButtonText}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Feather name="repeat" size={24} color="white" />
            <Text style={styles.actionButtonText}>Swap</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Feather name="send" size={24} color="white" />
            <Text style={styles.actionButtonText}>Send</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.bottomSheetIndicator}
        >
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.bottomSheetTitle}>Balances</Text>
            <Feather name="clock" size={20} color="white" />
          </View>

          <BottomSheetFlatList
            data={TRANSACTIONS}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.transactionList}
          />
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2130",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  balanceContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  balanceText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    width: 80,
    height: 80,
    backgroundColor: "#252A3D",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    color: "white",
    marginTop: 8,
    fontSize: 14,
  },
  bottomSheetBackground: {
    backgroundColor: "#5EDCF5",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bottomSheetIndicator: {
    backgroundColor: "white",
    width: 40,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  transactionList: {
    paddingHorizontal: 20,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  transactionDate: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Wallet;
