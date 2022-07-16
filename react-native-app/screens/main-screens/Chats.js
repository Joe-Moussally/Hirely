import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// //firebase
import { collection, getDocs,addDoc, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import ChatsList from "../../components/chats-components/ChatsList";
import { globalStyles } from "../../styles/global";

export default function Chats() {

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

            //firebase queries
            let q1 = query(chatsRef,where('from','==',JSON.parse(user).id))
            let q2 = query(chatsRef,where('to','==',JSON.parse(user).id))

            //fetching the messages from firestore
            await getDocs(q1,q2).then((snapshot) => {
                let chats = []
                snapshot.docs.forEach((message) => {
                    chats.push({...message.data()})
                })
                setMessages(chats)

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
            }).catch(err => {
                console.log('error here')
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

        <ChatsList messages={messages} contactIds={contactsId}/>
    )
}