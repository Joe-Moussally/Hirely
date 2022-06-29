import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import { globalStyles } from "../styles/global";
import { LinearGradient } from 'expo-linear-gradient';


export default function HirelySplash() {
    return (
        <View style={styles.SplashContainer}>
            
            <StatusBar backgroundColor={'transparent'} barStyle = "light-content" hidden = {false} translucent = {true}/>
            <LinearGradient
            colors={['#006eff', '#00f7ff' ]}
            style={styles.gradient}
            >

                <View style={styles.brandContainer}>
                    <Image
                    source={require('../assets/app-logos/white-brand.png')}
                    style={styles.brand}></Image>
                </View>

            </LinearGradient>

                <Text style={styles.splashText}>Find the talent you're looking for, or find the job of your dreams.</Text>
                
                <View style={styles.buttonsContainer}>

                    <TouchableOpacity style={styles.login}>
                        <Text style={styles.loginText}>Log In</Text> 
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signup}>
                        <Text style={styles.signupText}>Sign Up</Text> 
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
        // backgroundColor:'#00b3ff',
        borderRadius:1000,
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
        paddingTop: '30%',
        color:'#144e7a',
        marginBottom:'auto'
    },
    buttonsContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        width:'80%',
        marginBottom:'7%'
    },
    login: {
        backgroundColor:'#00b3ff',
        width:'45%',
        height:45,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    loginText: {
        color:'white',
        fontWeight:"bold",
        fontSize:25,
        textAlign:'center',
    },
    signup: {
        width:'45%',
        height:45,
        borderRadius:10,
        borderColor:'#00b3ff',
        borderWidth:4
    },
    signupText: {
        color:'#00b3ff',
        fontWeight:"bold",
        fontSize:25,
        textAlign:'center',
    },
    gradient:{
        height: '50%',
        width:'100%',
        // backgroundColor:'#00b3ff',
        borderRadius:1000,
        transform: [{ scale: 1.5 },{ translateY:-40 }],
        alignItems:'center',
        justifyContent:'center'
    }
})