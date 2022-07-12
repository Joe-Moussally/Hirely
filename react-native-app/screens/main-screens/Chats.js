import { useEffect } from "react";
import { Button, Text } from "react-native";

export default function Chats({navigation}) {

    useEffect(()=>{

        //get the user's chats
        

    },[])

    return (
        <Button title="Go to Chat" onPress={()=>navigation.push('ChatStack')}/>
    )
}