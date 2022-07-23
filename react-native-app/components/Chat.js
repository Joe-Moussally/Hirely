import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback } from "react";
import { Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

//firebase
import { collection, getDocs,addDoc, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import ChatHeader from "./chats-components/ChatHeader";

export default function Chat({ route }) {

    //chats collection reference in firebase
    const chatsRef = collection(db,'chats')

    //queries
    let q;
    
    const [messages,setMessages] = useState(route.params.messages)
    
    //track the logged in user's id
    const [user,setUser] = useState(route.params.user)

    //get the user's chats
    useEffect(() => {
        

        //--------------FIREBASE--------------//

        //set query to fetch appropriate messages according to the user's id
        q = query(chatsRef)
        let q2 = query(chatsRef)
        onSnapshot(chatsRef,(snapshot) => {
            let array = []
            let contactId = route.params.contact.id
            snapshot.docs.forEach((message) => {
                if((message.data().from == contactId && message.data().to == route.params.user.id) || (message.data().from == route.params.user.id && message.data().to == contactId)) {

                    // //adding contact's picture to message
                    // let userData
                    // if(message.data().user.name == route.params.contact.name) {
                    //     userData = {
                    //         _id:message.data().user.id,
                    //         name:message.data().user.name,
                    //         avatar:route.params.contact.picture_base64
                    //     }
                    // } else {
                    //     userData = message.data().user
                    // }

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
            showAvatarForEveryMessage={true}
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