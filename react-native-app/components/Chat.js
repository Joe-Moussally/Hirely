import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback } from "react";
import { Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

//firebase
import { collection, getDocs,addDoc, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import ChatHeader from "./ChatHeader";

export default function Chat({ route }) {

    //chats collection reference in firebase
    const chatsRef = collection(db,'chats')

    //queries
    // const q = query(chatsRef, where('reciever','==',route.params.contactId))
    
    const [messages,setMessages] = useState([])
    
    //track the logged in user's id
    const [user,setUser] = useState('')

    //get the user's chats
    useEffect(() => {

        //get the user's id
        AsyncStorage.getItem('user').then(user=>{
            setUser(JSON.parse(user))
        })

        //--------------FIREBASE--------------//

        onSnapshot(chatsRef,(snapshot) => {
            let array = []
            snapshot.docs.forEach((message) => {
                array.push({
                    _id: message.data()._id,
                    text: message.data().text,
                    createdAt: message.data().createdAt.toDate(),
                    user: message.data().user
                })
            })
            array.sort((a, b) => b.createdAt - a.createdAt)
            setMessages(array)
        })
        //------------------------------------//


    }, []);

    const onSend = useCallback((messages = []) => {
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
                user
                // reciever:route.params.contactId
            })
            
    }, [])


    return (
        <View style={{flex:1,backgroundColor:'white'}}>
            <ChatHeader contactId={route.params.contactId}/>
            <GiftedChat 
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id:user.id,
                name:user.name,
                avatar:user.picture
            }}
            />
        </View>
    )
}