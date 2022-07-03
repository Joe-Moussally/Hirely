import { Button, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

export default function Profile() {

    //track user's info
    const [user,setUser] = useState('')

    useEffect(()=>{
        //get user info from local storage
        const getUser = async () => {
            await AsyncStorage.getItem('user').then((user)=>{
                setUser(JSON.parse(user))
            })
        }
        getUser()
        console.log(user)

    },[])
    return (
        <View>
            <Text>PROFILE</Text>
        </View>
    )
}