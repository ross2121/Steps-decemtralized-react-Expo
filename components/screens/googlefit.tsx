import { error } from 'console'
import React from 'react'
import { Button, SafeAreaView, View,Text } from 'react-native'
import GoogleFit, { Scopes } from 'react-native-google-fit'
 const Google=()=>{
  const Onclick=async()=>{  
    const options = {
        scopes: [
          Scopes.FITNESS_ACTIVITY_READ,
          Scopes.FITNESS_ACTIVITY_WRITE,
          Scopes.FITNESS_BODY_READ,
          Scopes.FITNESS_BODY_WRITE,
        ],
      }
      await GoogleFit.authorize(options)
        .then(authResult => {
          if (authResult.success) {
            alert("Auth success")
          } else {
             alert("Auth denied")
          }
        })
        .catch(() => {
           console.log(error);
        })
    }
        return(
              <SafeAreaView>
                  <View>
                    <Text>Initialize Health Connect</Text>
                    <Button title="Request Permission" onPress={Onclick} />
                  </View> 
                </SafeAreaView>
        )
}
export default Google;