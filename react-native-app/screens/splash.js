import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Splash() {
    return (
        <View style={styles.container}>
            <Text>Splash</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding:24,
        backgroundColor:'red',
    }
})