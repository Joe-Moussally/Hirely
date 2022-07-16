import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import axios from 'axios'
import ContactCard from "./ContactCard";
import { globalStyles } from '../../styles/global'

const ChatsList = ({ contactIds }) => {

    return (
        <View style={globalStyles.container}>
            <FlatList
            data={contactIds}
            renderItem={({item}) => <ContactCard id={item}/>}/>
        </View>
        
    );
}
 
export default ChatsList;
