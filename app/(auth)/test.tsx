import { router } from "expo-router";
import { Button, View, Text, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";

const Index = () => {
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Login"
                        onPress={() => router.push("/(auth)/login")}
                    />
                    <Button
                        title="Signup"
                        onPress={() => router.push("/(auth)/singup")}
                    />
                </View>
            </View>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "space-between",
        height: 100,
    },
});

export default Index;