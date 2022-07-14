import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback } from "react";
import { Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

//firebase
import { collection, getDocs,addDoc, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function Chat({ route }) {

    //chats collection reference in firebase
    const chatsRef = collection(db,'chats')

    //queries
    // const q = query(chatsRef, where('reciever','==',route.params.contactId))
    

    const [messages,setMessages] = useState([])
    const [contactId,setContactId] = useState(route.params.contactId)
    
    //track the logged in user's id
    const [user,setUser] = useState('')

    //get the user's chats
    useEffect(() => {

        //--------------FIREBASE--------------//


        //get collection of data
        getDocs(chatsRef).then((snapshot) => {
            snapshot.docs.forEach((message) => {
                setMessages(previousMessages => {
                    return [...previousMessages,message.data()]
                })
            })
        })
        console.log('MESSAGESSS',messages)
        //------------------------------------//

        //get the user's id
        AsyncStorage.getItem('user').then(user=>{setUser(JSON.parse(user))})

        setMessages([])
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.
            append(previousMessages, messages))
            const {
                _id,
                createdAt,
                text,
                user
            } = messages[0]
            addDoc(chatsRef,{
                _id,
                createdAt,
                text,
                user,
                reciever:route.params.contactId
            })
            
    }, [])


    return (
        <View style={{flex:1,backgroundColor:'white'}}>
            <GiftedChat 
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={onSend}
            user={{
                _id:user.id,
                name:user.name,
                avatar:user.picture
            }}
            />
            <Text>{route.params.contactId} + {user.id}</Text>
        </View>
    )
}