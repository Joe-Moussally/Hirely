import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import axios from 'axios'
import ContactCard from "./ContactCard";

const ChatsList = ({ contactIds }) => {

    useEffect(()=>{

        console.log('HERE',contactIds)

        //get the contacts name and photo from id


    },[])

    return (
        <View style={{flex:1}}>
            <FlatList
            data={contactIds}
            renderItem={({item}) => <ContactCard id={item}/>}/>
        </View>
        
    );
}
 
export default ChatsList;