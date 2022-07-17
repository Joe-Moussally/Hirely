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
    let q;
    
    const [messages,setMessages] = useState(route.params.messages)
    
    //track the logged in user's id
    const [user,setUser] = useState('')

    //get the user's chats
    useEffect(() => {

        //get the user's id
        AsyncStorage.getItem('user').then(obj=>{
            setUser(JSON.parse(obj))

            
            //--------------FIREBASE--------------//

            //set query to fetch appropriate messages according to the user's id
            q = query(chatsRef)
            let q2 = query(chatsRef)
            onSnapshot(q,q2,(snapshot) => {
                let array = []
                let contactId = route.params.contact.id
                snapshot.docs.forEach((message) => {
                    if((message.data().from == contactId && message.data().to == user.id) || (message.data().from == user.id && message.data().to == contactId)) {
                        array.push({
                            _id: message.data()._id,
                            text: message.data().text,
                            createdAt: message.data().createdAt.toDate(),
                            user: message.data().user
                        })
                    }

                })
                array.sort((a, b) => b.createdAt - a.createdAt)
                setMessages(array)
            })
        }).catch((err) => {
            console.warn(err)
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
                user,
                from:route.params.user.id,
                to:route.params.contact.id
            }).catch(err => {
                console.warn(err)
            })
            
    }, [])


    return (
        <View style={{flex:1,backgroundColor:'white'}}>
            <ChatHeader contact={route.params.contact}/>
            <GiftedChat 
            messages={messages}
            showAvatarForEveryMessage={false}
            renderAvatar={()=>{return <View/>}}
            onSend={messages => onSend(messages)}
            user={{
                _id:route.params.user.id,
                name:route.params.user.name,
            }}
            />
        </View>
    )
}