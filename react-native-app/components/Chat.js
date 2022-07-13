import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs,addDoc } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import { Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { db } from "../firebase";

export default function Chat({ route }) {

    //chats collection reference in firebase
    const chatsRef = collection(db,'chats')
    

    const [messages,setMessages] = useState([])
    const [contactId,setContactId] = useState(route.params.contactId)
    
    //track the logged in user's id
    const [user,setUser] = useState('')

    //get the user's chats
    useEffect(() => {

        //--------------FIREBASE--------------//


        //get collection of data
        getDocs(chatsRef).then((snapshot) => {
            console.log("FIREBASE CHAT")
        })
        //------------------------------------//

        //get the user's id
        AsyncStorage.getItem('user').then(user=>{setUser(JSON.parse(user))})

        setMessages([
            {
                _id: 5,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 22,
                    name: 'React Native',
                    avatar: user.picture,
                },
            },
        ])
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