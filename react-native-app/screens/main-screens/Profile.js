import { Button, Image, StyleSheet, Text, View, Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { globalStyles } from "../../styles/global";
import * as ImagePicker from 'expo-image-picker';

export default function Profile({ setTokenApp }) {

    //track user's info
    const [user,setUser] = useState(async () => await AsyncStorage.getItem('user').then((val)=>{setUser(JSON.parse(val))}))

    //track user's picture if updated
    const [image,setImage] = useState(null)

    useEffect(()=>{

        const uploadImage = async () => {
            if(Platform.OS !== 'web'){
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
                if(status !== 'granted') {
                    alert('Permission is required to select a picture')
                }
            }
        }
        uploadImage()

    },[])

    const PickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[1,1],
            quality:1
        })
        console.log(result)
        if(!result.cancelled){
            setImage(result.uri)
        }
    }


    return (
        <View style={[globalStyles.container,styles.profileContainer]}>

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

            <Button title="LOGOUT" onPress={()=>setTokenApp(null)}/>

        </View>
    )
}

const styles = StyleSheet.create({
    name:{
        alignSelf:'center',
        margin:20,
        fontSize:24,
        fontWeight:'bold'
    },
    profileContainer:{
        backgroundColor:'white'
    }
})