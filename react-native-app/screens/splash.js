import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";

export default function HirelySplash() {
    return (
        <View style={styles.SplashContainer}>
            <View style={styles.brandContainer}>
                <Image source={require('../assets/app-logos/white-brand.png')}
                        style={styles.brand}></Image>
            </View>

            <Text style={styles.splashText}>Find the talent you're looking for, or find the job of your dreams.</Text>
            
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.login}>
                    <Text style={styles.loginText}>LogIn</Text> 
                </TouchableOpacity>
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
        transform: [{ scale: 1.5 },{ translateY:-40 }],
        alignItems:'center',
        justifyContent:'center'
    },
    brand:{
        width:'70%',
        resizeMode:'contain'
    },
    splashText: {
        textAlign: 'center',
        fontSize: 30,
        padding: 10,
        paddingTop: '25%',
        color:'#144e7a'
    },
    buttonsContainer: {
        flexDirection:'row',
    },
    login: {
        backgroundColor:'#00b3ff',
        width:'40%',
        height:45,
        borderRadius:10,
    },
    loginText: {
        color:'white',
        fontWeight:"bold",
        fontSize:25
    }
})