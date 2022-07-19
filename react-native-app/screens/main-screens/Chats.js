import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// //firebase
import { collection, getDocs,addDoc, query, where, onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";
import ChatsList from "../../components/chats-components/ChatsList";
import { globalStyles } from "../../styles/global";

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

        <ChatsList user={user} messages={messages} contactIds={contactsId}/>
    )
}