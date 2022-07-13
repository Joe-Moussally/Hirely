import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, StatusBar, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';


export default function Splash({navigation}) {
    return (
        <View style={styles.SplashContainer}>
            
            <StatusBar backgroundColor={'transparent'} barStyle = "light-content" hidden = {false} translucent = {true}/>
            <LinearGradient
            colors={['#006eff', '#00f7ff' ]}
            style={styles.gradient}
            >

                <View style={styles.brandContainer}>
                    <Image
                    source={require('../../assets/app-logos/white-brand.png')}
                    style={styles.brand}></Image>
                </View>

            </LinearGradient>

                <Text style={styles.splashText}>Find the talent you're looking for, or find the job of your dreams.</Text>
                
                <View style={styles.buttonsContainer}>

                    <TouchableOpacity
                    style={styles.login}
                    onPress={()=> navigation.push('LogIn')}>
                        <Text style={styles.loginText}>Log In</Text> 
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={styles.signup}
                    onPress={()=> navigation.push('SignUp')}>
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
        // height: '50%',
        width:'100%',
        borderRadius:Dimensions.get('window').width,
        alignItems:'center',
        justifyContent:'center',
    },
    brand:{
        width:'70%',
        resizeMode:'contain'
    },
    splashText: {
        textAlign: 'center',
        fontSize: 28,
        padding: 15,
        paddingTop: '30%',
        color:'#0071ad',
        marginBottom:'auto',
        fontWeight:'bold'
    },
    buttonsContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        width:'90%',
        marginBottom:'7%'
    },
    login: {
        backgroundColor:'#00a6ff',
        width:'45%',
        height:50,
        borderRadius:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    loginText: {
        color:'white',
        fontWeight:"bold",
        fontSize:25,
    },
    signup: {
        width:'45%',
        height:50,
        borderRadius:10,
        borderColor:'#00a6ff',
        borderWidth:4,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    signupText: {
        color:'#00a6ff',
        fontWeight:"bold",
        fontSize:25,
    },
    gradient:{
        height: '50%',
        width:'100%',
        borderRadius:1000,
        transform: [{ scale: 1.5 },{ translateY:-40 }],
        alignItems:'center',
        justifyContent:'center'
    }
})