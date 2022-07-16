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
    
    //track the contact ids
    const [contactsId,setContactsId] = useState('')
    let contactsArray = []

    //chats collection reference in firebase
    const chatsRef = collection(db,'chats')
    
    useEffect(()=>{

  
        
        const getMessages = async () => {

            let user = await AsyncStorage.getItem('user')

            let q1 = query(chatsRef,where('from','==',JSON.parse(user).id))
            let q2 = query(chatsRef,where('to','==',JSON.parse(user).id))

            await getDocs(q1,q2).then((snapshot) => {
                let chats = []
                snapshot.docs.forEach((message) => {
                    chats.push({...message.data()})
                })
                setMessages(chats)

                chats.forEach(message => {
                        if(!contactsArray.includes(message.from)) {
                            contactsArray.push(message.from)
                        }
                        if(!contactsArray.includes(message.to)) {
                            contactsArray.push(message.to)
                        }
                })
                
                setContactsId(contactsArray)
                console.log('CONTACTS ID',contactsId)
                // getContactIds()
            }).catch(err => {
                console.log('error here')
            })
        }
        getMessages()

    },[])

    return (
        <ChatsList contactIds={contactsId}/>
    )
}