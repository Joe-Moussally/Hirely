import { useEffect } from "react";
import { Text } from "react-native";

const ChatsList = ({ userMessages }) => {

    useEffect(()=>{
        console.log(userMessages)

        //function to get the user's contacts from messages
    },[])

    return (
        <Text>CHATS LIST</Text>
    );
}
 
export default ChatsList;