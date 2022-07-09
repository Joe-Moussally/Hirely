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
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:1,
        })
        if(!result.cancelled){
            console.log(result)
            setImage(dataURItoBlob(result.uri))
            console.log('IMAGE',typeof(image))
            //call function to upload picture
            uploadImage(result)

            //update user profile on local storage
            // async () => await AsyncStorage.getItem('user').then((val)=>{setUser(JSON.parse(val))})
        }
    }

    const uploadImage = (imageInfo) => {

        let data = new FormData()
        data.append('uri',imageInfo.uri)


        AsyncStorage.getItem('token').then((token)=>{
            axios({
                headers:{
                    'Authorization':'Bearer '+token,
                    'Content-Type':'multipart/form-data'
                },
                method:'POST',
                data:data,
                url:'http://'+localhost+':8000/api/picture',
            }).then((Response) => {
                console.log('UPLOAD IMAGE INFO',Response.data)
            }).catch(err=>{
                console.log(err.response.status)
            })
        })


    }

    //reference: https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
    
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
    
        return new Blob([ia], {type:mimeString});
    }


    return (
        <View style={[globalStyles.container,styles.profileContainer]}>

            <Image style={{width:200,height:200}} source={{uri:image}}/>
            {
                //check if user has a profile picture
                user.picture?
                <Image
                style={globalStyles.profilePicture}
                source={{uri:user.picture}}/>:
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