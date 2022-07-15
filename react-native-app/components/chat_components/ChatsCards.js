import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const ChatsCards = ({userMessages}) => {

    //track array of user's chats
    const [contactsId,setContactsId] = useState([])

    useEffect(()=>{
        //see the messages and append a chat according to those messages
        const getChats = (messagesArray) => {
            let array = []
            messagesArray.forEach(message => {
                if(!array.includes(message.to)) {
                    array.push(message.to)
                }
            });
            setContactsId(array)
            console.log(contactsId)
        }
        getChats(userMessages)
    },[])
    return (
        <View>
            <Text>TEST</Text>
        </View>
    );
}
 
export default ChatsCards;