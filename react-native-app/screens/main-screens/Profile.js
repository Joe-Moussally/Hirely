import { Button, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {

    const LogOut = () => {
        console.log(AsyncStorage.getItem('token').then((value)=>{
            console.log(value)
        }))
        AsyncStorage.removeItem('token')
    }

    return (
        <>
            <Text>Profile</Text>
            <Button title="LOGOUT" onPress={LogOut}>Logout</Button>
        </>
    )
}