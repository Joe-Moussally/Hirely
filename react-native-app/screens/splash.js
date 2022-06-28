import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { globalStyles } from "../styles/global";

export default function Splash() {
    return (
        <View style={globalStyles.container}>
            <View style={styles.brandContainer}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    brandContainer: {
        height: 40
    }
})