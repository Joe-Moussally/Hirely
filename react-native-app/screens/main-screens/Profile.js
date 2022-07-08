import { Button, Image, StyleSheet, Text, View, Platform, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { localhost } from "../../globalVariables";
import { globalStyles } from "../../styles/global";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";

export default function Profile({ setTokenApp }) {

    //track user's info
    const [user,setUser] = useState('') //async () => await AsyncStorage.getItem('user').then((val)=>{setUser(JSON.parse(val))})

    //track user's picture if updated
    const [image,setImage] = useState(null)

    useEffect(()=>{

        //get user's profile from token
        AsyncStorage.getItem('token').then((token) => {
            axios({
                method:'POST',
                headers:{'Authorization':'Bearer '+token},
                url:'http://'+localhost+':8000/api/profile'
            }).then((Response) => {
                console.log(('PROFILEEEEEEEEEEEEEEEEE',Response.data))
                setUser(Response.data)
            })
        })

        const uploadImage = async () => {
            if(Platform.OS !== 'web'){
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
                if(status !== 'granted') {
                    alert('Permission is required to select a picture')
                }
            }
        }
        uploadImage()

    },[image])

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

            //update user profile on local storage
            async () => await AsyncStorage.getItem('user').then((val)=>{setUser(JSON.parse(val))})

            //upload the image to the server
            let data = new FormData()
            data.append('image',result.uri)

            AsyncStorage.getItem('token').then((token) => {

                axios({
                    method:'POST',
                    data:data,
                    headers:{
                        'Authorization':'Bearer '+token,
                        'Content-Type':'multipart/form-data'
                    },
                    url:'http://'+localhost+':8000/api/picture',

                })
            })
        }




    }


    return (
        <View style={[globalStyles.container,styles.profileContainer]}>

            {
                //check if user has a profile picture
                user['picture']?
                <Image
                style={globalStyles.profilePicture}
                source={{uri:user['picture']}}/>:
                <Image
                style={globalStyles.profilePicture}
                source={require('../../assets/profile/default_picture.jpg')} />
            }

            <TouchableOpacity onPress={pickImage}>
                <Text style={styles.changePicture}>Change Picture</Text>
            </TouchableOpacity>

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
    },
    changePicture:{
        alignSelf:'center',
        margin:12,
        textDecorationLine:'underline'
    }
})