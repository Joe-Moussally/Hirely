import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import axios from 'axios'
import ContactCard from "./ContactCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatsList = ({ contactIds,messages,user }) => {

    const [conversationMessages,setConversationMessages] = useState([])

    useEffect(()=>{
        

    },[])

    return (
        <View style={styles.container}>
            <FlatList
            data={contactIds}
            renderItem={({item}) => {
                let conversationMessages = []
                messages.forEach(message => {
                    if((message.from == item || message.to == item) && (message.from == user.id || message.to == user.id)) {
                        conversationMessages.push(message)
                    }
                    
                });
                return <ContactCard id={item} messages={conversationMessages}/>
            }}/>
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