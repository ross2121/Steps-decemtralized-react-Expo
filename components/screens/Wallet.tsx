import AsyncStorage from "@react-native-async-storage/async-storage";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Clipboard from "expo-clipboard";
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
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Feather, Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SlideButton from "rn-slide-button";
import axios from "axios";
// const [copiedText, setCopiedText] = useState("");
// const copyToClipboard = async () => {
//   await Clipboard.setStringAsync("hello world");
// };
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
   "https://api.devnet.solana.com"
  );
  const [balance, setBalance] = useState(0);
  const Airdrop=async()=>{
    console.log("chek1");
   
    const connection=new Connection("https://api.devnet.solana.com");
    console.log("cheke2");
    const publicKey = await AsyncStorage.getItem("PublicKey");
    console.log("cheke4");
    if (!publicKey) {
      Alert.alert("No public key found");
      return;
    }
  try {
    console.log("cheke3");
    await connection.requestAirdrop(new PublicKey(publicKey),LAMPORTS_PER_SOL);
    Alert.alert("Success");
  }
  catch(e:any){
    // seterro(e);
    console.log(e);
    Alert.alert(e);
  }
  }
  

  useEffect(() => {
    const fetchWallet = async () => {
      const publicKey = await AsyncStorage.getItem("PublicKey");
      if (!publicKey) {
        // Alert.alert("No public key found");
        return;
      }
      const balance = await connection.getBalance(new PublicKey(publicKey));
      console.log(balance);
      setBalance(balance);
    };
    fetchWallet();
  }, []);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);
  const snapPointsModal = useMemo(() => ["30%", "50%"], []);
  const snapPointsModal2 = useMemo(() => ["55%", "60%"], []);

  const renderItem = useCallback(({ item }: any) => {
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

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef2 = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSendModal = useCallback(() => {
    bottomSheetModalRef2.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handleSheetChanges2 = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <LinearGradient
            colors={["#1a0033", "#4b0082", "#290d44"]}
            style={styles.gradient}
          >
            {/* Wallet Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Wallet</Text>
              <TouchableOpacity style={styles.settingsButton}>
                <Feather name="settings" size={24} color="#5EDCF5" />
              </TouchableOpacity>
            </View>

            {/* Balance Display */}
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceText}>
                ${(balance / LAMPORTS_PER_SOL).toFixed(2)}
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handlePresentModalPress}
              >
                <Feather name="plus" size={24} color="white" />
                <Text style={styles.actionButtonText}>Add</Text>
              </TouchableOpacity>
              {/* <Button title="Present Modal" color="black" /> */}
              <BottomSheetModal
                ref={bottomSheetModalRef}
                snapPoints={snapPointsModal}
                index={0}
                handleIndicatorStyle={{
                  backgroundColor: "#CCCCCC",
                  width: 40,
                  height: 5,
                  borderRadius: 3,
                }}
                onChange={handleSheetChanges}
                backgroundStyle={styles.bottomModalBackground}
                backdropComponent={(props) => (
                  <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                    opacity={0.9}
                  />
                )}
              >
                <BottomSheetView>
                  <AddModal />
                </BottomSheetView>
              </BottomSheetModal>
              <TouchableOpacity style={styles.actionButton} onPress={Airdrop}>
                <Feather name="repeat" size={24} color="white" />
                <Text style={styles.actionButtonText}>Swap</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleSendModal}
              >
                <Feather name="send" size={24} color="white" />
                <Text style={styles.actionButtonText}>Send</Text>
              </TouchableOpacity>
              <BottomSheetModal
                ref={bottomSheetModalRef2}
                snapPoints={snapPointsModal2}
                index={0}
                handleIndicatorStyle={{
                  backgroundColor: "#CCCCCC",
                  width: 40,
                  height: 5,
                  borderRadius: 3,
                }}
                onChange={handleSheetChanges2}
                backgroundStyle={styles.bottomModalBackground}
                backdropComponent={(props) => (
                  <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                    opacity={0.9}
                  />
                )}
              >
                <BottomSheetView>
                  <SendModal />
                </BottomSheetView>
              </BottomSheetModal>
            </View>
          </LinearGradient>
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backgroundStyle={styles.bottomSheetBackground}
            handleIndicatorStyle={styles.bottomSheetIndicator}
            style={{ paddingHorizontal: 12 }}
          >
            <View
              style={{
                backgroundColor: "#1a0033",
                marginTop: 20,
                borderRadius: 20,
              }}
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
            </View>
          </BottomSheet>
        </BottomSheetModalProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const AddModal = () => {
  const [copiedText, setCopiedText] = useState("");
 
  const copyToClipboard = async () => {
    const key = await AsyncStorage.getItem("PublicKey");
    if (key == null) {
      setCopiedText("No public key found");
      return;
    }
    setCopiedText(key);
    await Clipboard.setStringAsync(key);
  };
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: "#1a0033",
          borderRadius: 20,
          marginTop: 20,
        }}
      >
        <Text style={styles.bottomSheetTitle}>Add crypto</Text>
        <View
          style={{
            padding: 20,
            borderRadius: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "#9c96a3",
              padding: 10,
              borderRadius: 20,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                color: "white",
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {copiedText}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#7E3887",
              paddingVertical: 10,
              width: "20%",
              borderRadius: 20,
              marginTop: 20,
              alignItems: "center",
              alignSelf: "center",
            }}
            onPress={copyToClipboard}
          >
            <Text style={{ color: "white" }}>Copy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const SendModal = () => {
  const [Amount,setamount]=useState(0);
  const[publicaddress,setpublicaddress]=useState("");
  const[error,seterror]=useState("")
  const[loading,setloading]=useState(false);
  const[reponse,setrespons]=useState(false);
  const onSend=async()=>{
    setloading(true);
    const publickey=await AsyncStorage.getItem("PubblicKey");
    if(!publickey){
      return;
    }
      const connection=new Connection("https://api.devnet.solana.com");
      const transaction=new Transaction().add(SystemProgram.transfer({
        fromPubkey:new PublicKey(publickey),
         toPubkey:new PublicKey(publicaddress),
         lamports:LAMPORTS_PER_SOL*Amount
      }))
      const {blockhash}=await connection.getRecentBlockhash()
       transaction.recentBlockhash=blockhash;
       transaction.feePayer=new PublicKey(publickey);
       const serializetransaction=transaction.serialize({
        requireAllSignatures:false,
        verifySignatures:false,
       }) 
      try{
          const response=await axios.post(`https://decentrailzed-ttrack.vercel.app/api/v1/send/wallet`,{tx:serializetransaction})
            console.log(response);

      } catch(e:any){
          seterror(e);
      } finally{
        setloading(false)
      }  
  } 
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{ padding: 20, borderRadius: 20, backgroundColor: "#1a0033" }}
      >
        <Text style={styles.bottomSheetTitle}>Send Crypto</Text>
        <View>
          <Text style={{ color: "white", marginTop: 20 }}>
            Send crypto to a friend
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
              paddingLeft: 10,
            }}
          >
            <Text style={{ color: "white" }}>Amount</Text>
            <View
              style={{
                flex: 1,
                backgroundColor: "#9c96a3",
                padding: 8,
                marginLeft: 5,
                borderRadius: 20,
              }}
            >
              <TextInput
                placeholder="Enter amount"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                onChange={(e:any)=>setamount(parseInt(e))}
                style={{ color: "white" }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "white" }}>Recipient</Text>
            <View
              style={{
                flex: 1,
                backgroundColor: "#9c96a3",
                padding: 10,
                borderRadius: 20,
                marginLeft: 10,
              }}
            >
              <TextInput
                placeholder="Enter recipient address"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                style={{ color: "white" }}
                onChange={(e:any)=>setpublicaddress(e)}
              />
            </View>
          </View>
          {/* <TouchableOpacity
            style={{
              backgroundColor: "#7E3887",
              paddingVertical: 10,
              width: "20%",
              borderRadius: 20,
              marginTop: 20,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "white" }}>Send</Text>
          </TouchableOpacity> */}
          <View
            style={{
              marginTop: 20,
            }}
          >
            <SlideButton
              title="Slide To Send"
              width="70%"
              padding="2"
              reverseSlideEnabled={false}
              animation={true}
              titleContainerStyle={{
                backgroundColor: "#7E3887",
              }}
              containerStyle={{
                backgroundColor: "#4b0082",
              }}
              underlayStyle={{
                backgroundColor: "#1a0033",
              }}
              // height="30%"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  // modal
  bottomModalBackground: {
    flex: 1,
    backgroundColor: "#7E3887",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
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
    backgroundColor: "#7E3887",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bottomSheetIndicator: {
    backgroundColor: "#CCCCCC",
    width: 40,
    height: 5,
    borderRadius: 3,
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
    paddingBottom: "100%",
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
