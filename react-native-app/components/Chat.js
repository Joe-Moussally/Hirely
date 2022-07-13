import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";


export default function Chat({ route }) {

    const [messages,setMessages] = useState([])
    const [contactId,setContactId] = useState(route.params.contactId)

    //get the user's chats
    useEffect(() => {
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


    return (
        <View style={{flex:1}}>
            <GiftedChat 
            messages={messages}
            />
            <Text>{route.params.contactId}</Text>
        </View>
    )
}