import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { globalStyles } from "../styles/global";

export default function HirelySplash() {
    return (
        <View style={styles.SplashContainer}>
            <View style={styles.brandContainer}>
                <Image source={require('../assets/app-logos/white-brand.png')}
                        style={styles.brand}></Image>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    SplashContainer:{
        flex:1,
        alignItems:'center'
    },
    brandContainer: {
        height: '50%',
        width:'100%',
        backgroundColor:'#00b3ff',
        borderRadius:1000,
        transform: [{ scale: 1.3 }],
        alignItems:'center',
        justifyContent:'center'
    },
    brand:{
        width:'50%',
        resizeMode:'aspect ratio'
    }
})