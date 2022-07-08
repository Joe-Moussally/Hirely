import { Button, Image, StyleSheet, Text, View, Platform, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { globalStyles } from "../../styles/global";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";

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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[1,1],
            quality:1
        })
        console.log(result.uri)
        if(!result.cancelled){
            setImage(result.uri)
        }

        //upload the image to the server
        let data = new FormData()
        data.append('image',result.uri)

        AsyncStorage.getItem('token').then((token) => {
            axios({
                method:'POST',
                body:data,
                headers:{
                    'Authorization':'Bearer '+token,
                    'Content-Type':'multipart/form-data'
                }
            })
        })


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

            <TouchableOpacity onPress={pickImage}>
                <Text style={styles.changePicture}>Change Picture</Text>
            </TouchableOpacity>

            <Text style={styles.name}>{user['name']}</Text>

            <Button title="LOGOUT" onPress={()=>setTokenApp(null)}/>
            {image && <Image source={{uri:image}} style={{width:200,height:200}}/>}
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
    },
    changePicture:{
        alignSelf:'center',
        margin:12,
        textDecorationLine:'underline'
    }
})