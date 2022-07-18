import { Button, Image, StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { localhost } from "../../globalVariables";
import { globalStyles } from "../../styles/global";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import WebView from "react-native-webview";
import axios from "axios";

export default function Profile({ setTokenApp }) {

    //track user's info
    const [user,setUser] = useState('')

    //track user's picture if updated
    const [image,setImage] = useState(null)
    const [cv,setCv] = useState('')

    useEffect(()=>{

        //get user's profile from token
        AsyncStorage.getItem('token').then((token) => {
            axios({
                method:'POST',
                headers:{'Authorization':'Bearer '+token},
                url:'http://'+localhost+':8000/api/profile'
            }).then(async(Response) => {
                setUser(Response.data)
                setImage('data:image/png;base64,'+user.picture_base64)
            })
        })

    },[image])

    //function to fetch PDF from local storage
    const fetchPDF = async () => {
        //get pdf uri and convert it to base64
        const res = await DocumentPicker.getDocumentAsync({type:'application/pdf'})
        const base64 = await FileSystem.readAsStringAsync(res.uri,{encoding:'base64'})

        //upload pdf base to users table
        AsyncStorage.getItem('token').then(token => {
            axios({
                headers:{
                    'Authorization':'Bearer '+token
                },
                method:'POST',
                url:'http://'+localhost+':8000/api/cv',
                data:{'cv_base64':base64}
            }).then(res => {console.log(res)})
            .catch(err => {console.log(err.response.status)}) 
        })
    };

    //function to pick and upload picture in base64
    const uploadPicture = async () => {
        let res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:1,
        })
        if(!res.cancelled){
            const base64 = await FileSystem.readAsStringAsync(res.uri,{encoding:'base64'})
            console.log(base64)
            //uploading image
            AsyncStorage.getItem('token').then(token => {
                axios({
                    headers:{
                        'Authorization':'Bearer '+token
                    },
                    method:'POST',
                    url:'http://'+localhost+':8000/api/picture',
                    data:{'picture_base64':base64}
                }).then(async (res) => {
                    setImage('data:image/png;base64,'+base64)
                }) 
                .catch(err => {console.log(err.response.status)}) 
            })
        }
    }

    return (
        <View style={[globalStyles.container,styles.profileContainer]}>

            {
                //check if user has a profile picture
                user.picture_base64?
                <Image
                style={globalStyles.profilePicture}
                source={{uri:image}}/>:
                <Image
                style={globalStyles.profilePicture}
                source={require('../../assets/profile/default_picture.jpg')} />
            }

            <TouchableOpacity onPress={uploadPicture}>
                <Text style={styles.changePicture}>Change Picture</Text>
            </TouchableOpacity>

            <Text style={styles.name}>{user.name}</Text>

            {/* Upload CV Button OR View CV Button*/}
            {
                !user.cv?
                <TouchableNativeFeedback
                onPress={fetchPDF}>
                    <View style={globalStyles.outlineButton}>
                        <Text style={globalStyles.outlineButtonText}>Upload CV</Text>
                    </View>
                </TouchableNativeFeedback>:
                <></>
            }

            {/* <WebView
            originWhitelist={['*']} 
            source={{uri:'data:application/pdf;base64,'+user.cv_base64}}
            style={{height:200,width:200,borderWidth:1,borderColor:'black',alignSelf:'center'}}/> */}

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