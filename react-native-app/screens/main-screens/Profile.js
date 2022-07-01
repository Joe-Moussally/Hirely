import { Button, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {

    const getToken = async () => {
        (AsyncStorage.getItem('token').then((val) => {
            console.log(val)
        }))
    }

    return (
        <>
            <Text>Profile</Text>
            <Button title="LOGOUT" onPress={getToken}>Logout</Button>
        </>
    )
}