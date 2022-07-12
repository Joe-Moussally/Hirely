import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function MainHeader() {
    return(
        <View style={styles.header}>
            
            <Ionicons name="arrow-back-sharp" size={24} color="white" style={styles.back} />
            <Image
            source={require('../assets/app-logos/white-brand.png')}
            style={styles.image}/>
            
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        height:40,
        width:'95%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        margin:0,
        padding:0
    },
    image:{
        resizeMode:'contain',
        height:'100%',
    }
})