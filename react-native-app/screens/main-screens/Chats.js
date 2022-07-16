import { useEffect, useState } from "react";
import { Button, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// //firebase
import { collection, getDocs,addDoc, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import ChatsList from "../../components/chats-components/ChatsList";

export default function Chats() {

    //track user messages to get the contacts
    const [messages,setMessages] = useState([])

    //chats collection reference in firebase
    const chatsRef = collection(db,'chats')
    
    useEffect(()=>{
        
        const getMessages = async () => {

            let user = await AsyncStorage.getItem('user')

            let q1 = query(chatsRef,where('from','==',JSON.parse(user).id))
            let q2 = query(chatsRef,where('to','==',JSON.parse(user).id))

            getDocs(q1,q2).then((snapshot) => {
                let chats = []
                snapshot.docs.forEach((message) => {
                    chats.push({...message.data()})
                })
                setMessages(chats)
            }).catch(err => {
                console.log('error here')
            })
        }

    },[])

    return (
        <ChatsList userMessages={messages}/>
    )
}