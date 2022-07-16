import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import axios from 'axios'
import ContactCard from "./ContactCard";

const ChatsList = ({ contactIds }) => {

    return (
        <View style={styles.container}>
            <FlatList
            data={contactIds}
            renderItem={({item}) => <ContactCard id={item}/>}/>
        </View>
        
    );
}
 
export default ChatsList;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    }
})