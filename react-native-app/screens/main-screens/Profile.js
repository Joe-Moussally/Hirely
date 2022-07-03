import { Button, Image, StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { globalStyles } from "../../styles/global";

export default function Profile({ setTokenApp }) {

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
        console.log('from profile.js',user)

    },[])
    return (
        <View style={globalStyles.container}>

            {
                //check if user has a profile picture
                user['picture']?
                <Image
                style={globalStyles.profilePicture}
                source={user['picture']}/>:
                <Image
                style={globalStyles.profilePicture}
                source={require('../../assets/profile/default_picture.jpg')} />
            }
            <Text style={styles.name}>{user['name']}</Text>

            <Button title="LOGOUT" onPress={() => setTokenApp(null)}/>

        </View>
    )
}

const styles = StyleSheet.create({
    name:{
        alignSelf:'center',
        margin:20,
        fontSize:24,
        fontWeight:'bold'
    }
})