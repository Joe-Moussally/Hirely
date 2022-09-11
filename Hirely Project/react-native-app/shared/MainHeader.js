import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Entypo, SimpleLineIcons } from '@expo/vector-icons';
import { StatusBar } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";

export default function MainHeader({ setTokenApp }) {
    return(
        <View style={styles.header}>

            <StatusBar backgroundColor={'#00a6ff'} barStyle = "light-content" animated={true} hidden = {false} translucent = {false}/>
            
            <Image
            source={require('../assets/app-logos/white-brand.png')}
            style={styles.image}/>

            <Menu>
                <MenuTrigger text={<Entypo name="menu" size={30} color="white" />} />
                <MenuOptions>
                    <MenuOption onSelect={() => setTokenApp(null)}  style={styles.logoutContainer}>
                        <SimpleLineIcons name="logout" size={20} color="red" />
                        <Text style={styles.logoutText}>Log Out</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>

        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        height:40,
        width:'65%',
        alignSelf:'center',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginLeft:'37%',
    },
    image:{
        resizeMode:'contain',
        width:'46%'
    },
    logoutContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        color:'red',
        height:30,
    },
    logoutText:{
        color:'red',
        marginLeft:5,
        transform:[{translateY:-1}]
    }
})