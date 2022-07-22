import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// //firebase
import { collection, getDocs,addDoc, query, where, onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";
import ChatsList from "../../components/chats-components/ChatsList";
import { globalStyles } from "../../styles/global";
import EmptyScreenText from "../../components/EmptyScreenText";

import * as Notifications from 'expo-notifications';

export default function Chats() {

    const [user,setUser] = useState('')

    //track user messages to get the contacts
    const [messages,setMessages] = useState([])
    
    //track if the data is loaded or not
    const [isLoading,setisLoading] = useState(true)

    //track the contact ids
    const [contactsId,setContactsId] = useState('')
    let contactsArray = []

    //chats collection reference in firebase
    const chatsRef = collection(db,'chats')
    
    useEffect(()=>{

        const getMessages = async () => {

            let user = await AsyncStorage.getItem('user')
            setUser(JSON.parse(user))


            //firebase queries
            let q1 = query(chatsRef,where('from','==',JSON.parse(user).id))
            let q2 = query(chatsRef,where('to','==',JSON.parse(user).id))

            //fetching the messages from firestore
            onSnapshot(q2,(snapshot) => {
                Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                });

                Notifications.scheduleNotificationAsync({
                    content:{
                        title:'You a new message!',
                        body:'THIS IS BODY',
                        data: { data: 'goes here' }
                    },
                    trigger:{
                        seconds:2,
                        channelId:'default'
                    }
                })

                let chats = []
                snapshot.docs.forEach((message) => {
                    chats.push(message.data())
                })
                setMessages(previous => [...previous,chats])

                //get the contact ids from messages
                chats.forEach(message => {
                        if(!contactsArray.includes(message.from)) {
                            contactsArray.push(message.from)
                        }
                        if(!contactsArray.includes(message.to)) {
                            contactsArray.push(message.to)
                        }
                })
                
                setContactsId(contactsArray)
                setisLoading(false)
            })
            onSnapshot(q1,(snapshot) => {
                let chats = []
                snapshot.docs.forEach((message) => {
                    chats.push(message.data())
                })
                setMessages(previous => [...previous,chats])

                //get the contact ids from messages
                chats.forEach(message => {
                        if(!contactsArray.includes(message.from)) {
                            contactsArray.push(message.from)
                        }
                        if(!contactsArray.includes(message.to)) {
                            contactsArray.push(message.to)
                        }
                })
                
                setContactsId(contactsArray)
                setisLoading(false)
            })
        }
        getMessages()

    },[])

    return (
        isLoading?
        <View style={globalStyles.loadingContainer}>
            <ActivityIndicator
            size={55}
            color='#00a6ff'/> 
        </View>
        :
        (contactsId.length == 0)?
        <View style={globalStyles.container}>
            <EmptyScreenText text="You don't have any messages"/>
        </View>:

        <ChatsList user={user} messages={messages} contactIds={contactsId}/>
    )
}