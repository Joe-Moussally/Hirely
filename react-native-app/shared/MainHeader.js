import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";

export default function MainHeader() {
    return(
        <View style={styles.header}>

            <StatusBar backgroundColor={'#00a6ff'} barStyle = "light-content" animated={true} hidden = {false} translucent = {false}/>
            
            <Image
            source={require('../assets/app-logos/white-brand.png')}
            style={styles.image}/>
                {/* <Ionicons name="arrow-back-sharp" size={24} color="white" style={styles.back}/> */}

            <Menu>
                <MenuTrigger text='Select action' />
                <MenuOptions>
                    <MenuOption onSelect={() => alert(`Save`)} text='Save' />
                    <MenuOption onSelect={() => alert(`Delete`)} >
                    <Text style={{color: 'red'}}>Delete</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
                </MenuOptions>
            </Menu>

            {/* <Text style={{fontSize:37,color:'white',fontWeight:'bold',marginLeft:'-10%'}}>:</Text> */}
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

        // borderWidth:2,
        // borderColor:'red'
    },
    image:{
        resizeMode:'contain',
        // height:'100%',
        width:'46%'
    }
})