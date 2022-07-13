import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback } from "react";
import { Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";


export default function Chat({ route }) {

    const [messages,setMessages] = useState([])
    const [contactId,setContactId] = useState(route.params.contactId)
    
    //track the logged in user's id
    const [userId,setUserId] = useState('')

    //get the user's chats
    useEffect(() => {

        //get the user's id
        AsyncStorage.getItem('user').then(user=>{setUserId(JSON.parse(user).id)})
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])


    return (
        <View style={{flex:1}}>
            <GiftedChat 
            messages={messages}
            onSend={messages => onSend(messages)}
            />
            <Text>{route.params.contactId} + {userId}</Text>
        </View>
    )
}