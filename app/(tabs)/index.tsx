import { View,Text, Button } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import React from "react"
import { router } from "expo-router"

const App=()=>{
  const onClick=()=>{
    router.push("/(Challenge)/Challenge");
  }
  const singup=()=>{
    router.push("/(auth)/singup")
  }
  return(
    <SafeAreaView>
        <Text>
          HOme
        </Text>
     <Button title="Create Competion" onPress={onClick}></Button>
     <View>
     <Button title="Register" onPress={singup}></Button>
     </View>
    </SafeAreaView>
  )
}
export default App;