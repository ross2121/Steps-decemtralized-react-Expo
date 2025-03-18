import AsyncStorage from "@react-native-async-storage/async-storage";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Alert, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// Theme colors
const COLORS = {
  primary: "#5E1F7C",
  secondary: "#7F3C87",
  accent: "#9C5CB7",
  light: "#B9C2ED",
  lightest: "#D6E8FF",
  white: "#FFFFFF",
  dark: "#1E2130",
  darkButton: "#252A3D",
  success: "#4CD964",
  error: "#FF3B30",
  info: "#007AFF",
};

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
];

const Wallet = () => {
  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <LinearGradient
          colors={["#1a0033", "#4b0082", "#1a0033"]}
          style={styles.gradient}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Wallet</Text>
            </View>

            {/* Balance Display */}
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceText}>$100.00</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="plus" size={24} color={"#FFFFFF"} />
                <Text style={styles.actionButtonText}>Add</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Feather name="repeat" size={24} color={"#FFFFFF"} />
                <Text style={styles.actionButtonText}>Swap</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Feather name="send" size={24} color={"#FFFFFF"} />
                <Text style={styles.actionButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
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
    color: "#FFFFFF",
  },
  balanceContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  balanceText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
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
    backgroundColor: "#7F3C87",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    color: "#FFFFFF",
    marginTop: 8,
    fontSize: 14,
  },
});

export default Wallet;
