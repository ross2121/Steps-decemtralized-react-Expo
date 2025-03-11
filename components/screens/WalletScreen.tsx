import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const WalletScreen = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "97%"], []);
  const handleSheetChange = useCallback((index: any) => {
    // console.log("handleSheetChange", index);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView>
        <Text>Balance</Text>
      </SafeAreaView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
        animateOnMount={true}
      >
        <Text>Transactions</Text>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
