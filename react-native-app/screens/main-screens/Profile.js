import { Button, Image, StyleSheet, Text, View, Platform, TouchableOpacity, TouchableNativeFeedback } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { localhost } from "../../globalVariables";
import { globalStyles } from "../../styles/global";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";

export default function Profile({ setTokenApp }) {

    //track user's info
    const [user,setUser] = useState('')

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
                setUser(Response.data)
                setImage(user.picture)
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
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:1,
        })
        if(!result.cancelled){
            console.log(result)

            let imageData = {
                uri:result.uri,
                type:'image/'+result.uri.split(".")[1],
                name:'image_'+user.id+result.uri.split(".")[1]
            }
            //call function to upload picture
            uploadImage(imageData)
        }
    }

    const uploadImage = (imageInfo) => {

        const data = new FormData()
        data.append('file',imageInfo)
        data.append('upload_preset','profilePicture')
        data.append('cloud_name','hirely')

        fetch('https://api.cloudinary.com/v1_1/hirely/image/upload',{
            method:'POST',
            body:data
            
        }).then((Response) => Response.json())
        .then(data => {

            //change user's image on profile screen
            setImage(data.url)

            // get user's token and set the image url in the picture column in user's table
            AsyncStorage.getItem('token').then((token) => {

                let imageData = new FormData()
                imageData.append('url',data.url)

                axios({
                    headers:{
                        'Authorization':'Bearer '+token,
                        'Content-Type':'multipart/form-data'
                    },
                    method:'POST',
                    data:imageData,
                    url:'http://'+localhost+':8000/api/picture'

                }).then((res) => {
                    console.log(res.data)
                }).catch((err)=>{
                    console.log(err.response.status)
                })
            })

        })

    }

    return (
        <View style={[globalStyles.container,styles.profileContainer]}>

            {
                //check if user has a profile picture
                image?
                <Image
                style={globalStyles.profilePicture}
                source={{uri:image}}/>:
                <Image
                style={globalStyles.profilePicture}
                source={require('../../assets/profile/default_picture.jpg')} />
            }

            <TouchableOpacity onPress={pickImage}>
                <Text style={styles.changePicture}>Change Picture</Text>
            </TouchableOpacity>

            <Text style={styles.name}>{user.name}</Text>

            {/* Upload CV Button */}
            <TouchableNativeFeedback>
                <View style={globalStyles.outlineButton}>
                    <Text style={globalStyles.outlineButtonText}>Upload CV</Text>
                </View>
            </TouchableNativeFeedback>

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
    },

})