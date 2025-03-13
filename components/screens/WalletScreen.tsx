import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, SafeAreaView,Text } from 'react-native';
import {createWallet,exportMnemonicFromKeystore,} from 'react-native-web3-wallet';
import react from "react"
const Wallet=()=>{
  const [publickey,setpublickey]=useState<String>("");
 const walletcreate=async()=>{  
  const wallet = await createWallet("NXT","m/44'/60'/0'/0/0",32,true,true,true);
 console.log(wallet.privateKey);
 console.log(wallet.privateKey);
 console.log("ghell");
 if(wallet.publicKey){
  console.log("true");
 setpublickey(wallet.publicKey);
}
 }
 return(
   <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Statistics</Text>
        <Text>{publickey}</Text>
        <Button title='Create wallet' onPress={walletcreate}></Button>
      </SafeAreaView>
 )

}
export default Wallet
