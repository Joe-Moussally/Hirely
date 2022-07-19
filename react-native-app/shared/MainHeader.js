import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from "react-native";

export default function MainHeader() {
    return(
        <View style={styles.header}>

            {/* <StatusBar backgroundColor={'transparent'} barStyle = "light-content" animated={true} hidden = {false} translucent = {true}/> */}
            
            <Ionicons name="arrow-back-sharp" size={24} color="white" style={styles.back}/>
            <Image
            source={require('../assets/app-logos/white-brand.png')}
            style={styles.image}/>
    
            <Text style={{fontSize:37,color:'white',fontWeight:'bold',marginLeft:'-10%'}}>:</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        height:40,
        width:'0%',
        alignSelf:'center',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        margin:0,
        padding:0,
    },
    image:{
        resizeMode:'contain',
        height:'100%',
    }
})