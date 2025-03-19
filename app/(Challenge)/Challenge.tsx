import  Competion from "@/components/screens/Competion"
import LeaderboardScreen from "@/components/screens/LeaderboardScreen"
import React from "react"
import { Modal } from "react-native"
import { GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
const App=()=>{
    return(
        <Modal>
             <GestureHandlerRootView style={{ flex: 1}}>
        {/* <Competion>

        </Competion> */}
        <LeaderboardScreen/>
            
        
        </GestureHandlerRootView>
        </Modal>
    )
}
export default App;