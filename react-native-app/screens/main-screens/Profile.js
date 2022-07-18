import { Button, Image, StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { localhost } from "../../globalVariables";
import { globalStyles } from "../../styles/global";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import WebView from "react-native-webview";
import axios from "axios";
import { AntDesign } from '@expo/vector-icons';
import SkillCard from "../../components/new-user-components/skills/SkillCard";

export default function Profile({ setTokenApp }) {

    //track user's info
    const [user,setUser] = useState('')

    //track user's picture if updated
    const [image,setImage] = useState(null)
    const [skills,setSkills] = useState([])

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    const Base64 = {
        btoa: (input = '')  => {
          let str = input;
          let output = '';
      
          for (let block = 0, charCode, i = 0, map = chars;
          str.charAt(i | 0) || (map = '=', i % 1);
          output += map.charAt(63 & block >> 8 - i % 1 * 8)) {
      
            charCode = str.charCodeAt(i += 3/4);
      
            if (charCode > 0xFF) {
              throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
            }
            
            block = block << 8 | charCode;
          }
          
          return output;
        },
      
        atob: (input = '') => {
          let str = input.replace(/=+$/, '');
          let output = '';
      
          if (str.length % 4 == 1) {
            throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
          }
          for (let bc = 0, bs = 0, buffer, i = 0;
            buffer = str.charAt(i++);
      
            ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
              bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
          ) {
            buffer = chars.indexOf(buffer);
          }
      
          return output;
        }
      };

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

            axios({
                method:'GET',
                url:'http://'+localhost+':8000/api/activities/'+user.id,
            }).then(res => {
                setSkills(res.data.skills)
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

    //function to delete the user's picture
    const removePicture = () => {

    }

    return (
        <View style={styles.profileContainer}>
        <ScrollView>

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

            <View style={styles.buttonsContainer}>

                <TouchableOpacity onPress={uploadPicture}>
                    <View style={styles.changePictureContainer}>
                        <AntDesign name="picture" size={24} color="#2a4d09" />      
                        <Text style={styles.changePictureText}>Change Picture</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={removePicture}>
                    <View style={styles.removePictureContainer}>
                        <AntDesign name="close" size={24} color="black" />      
                        <Text style={styles.removePictureText}>Remove Picture</Text>
                    </View>
                </TouchableOpacity>

            </View>


            <Text style={styles.name}>{user.name}</Text>

            {
                //user's about
                user.about?
                <View style={globalStyles.sectionContainer}>
                    <Text style={globalStyles.sectionTitle}>About</Text>
                    <Text style={globalStyles.sectionBody}>{user.about}</Text>
                </View>:
                <></>
            }

            {
                //user's skills
                (skills.length)?
                <View style={globalStyles.sectionContainer}>
                    <Text style={globalStyles.sectionTitle}>Skills</Text>
                    
                    {/* Skill cards container */}
                    <View style={globalStyles.skillsContainer}>
                        {
                            skills.map(element => (
                                <SkillCard removable={false} skill={element.skill}/>
                            ))
                        }
                    </View>

                </View>:
                <></>
            }

            {/* Upload CV Button OR View CV Button*/}
            {
                !user.cv_base64?
                <TouchableNativeFeedback
                onPress={fetchPDF}>
                    <View style={globalStyles.outlineButton}>
                        <Text style={globalStyles.outlineButtonText}>Upload CV</Text>
                    </View>
                </TouchableNativeFeedback>:
                <></>
            }

            {/* {
                user.cv_base64?
                <WebView
                originWhitelist={['*']} 
                source={{uri:'data:application/pdf;base64,'+user.cv_base64}}
                style={{height:200,width:200,borderWidth:1,borderColor:'black',alignSelf:'center'}}/>:
                <></>
            } */}
            

            <Button title="LOGOUT" onPress={()=>setTokenApp(null)}/>
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    name:{
        alignSelf:'center',
        margin:20,
        fontSize:24,
        fontWeight:'bold',
        padding:0
    },
    profileContainer:{
        backgroundColor:'white',
        paddingHorizontal:15,
        marginBottom:70,
        paddingTop:15
    },
    changePicture:{
        alignItems:'center',
        justifyContent:'center',
        margin:12,
        // textDecorationLine:'underline'
        paddingHorizontal:10,
        paddingVertical:5,
        backgroundColor:'gray'
    },
    buttonsContainer:{
        flexDirection:'row',
        justifyContent:'center'
    },
    changePictureContainer:{
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        flexDirection:'row',
        backgroundColor:'#caff99',
        paddingHorizontal:13,
        paddingVertical:4,
        borderRadius:10,
    },
    changePictureText:{
        marginHorizontal:5,
        color:'#2a4d09',
        fontWeight:'bold'
    },
    removePictureContainer:{
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        flexDirection:'row',
        backgroundColor:'#fc9d9d',
        paddingHorizontal:13,
        paddingVertical:4,
        borderRadius:10,
    },
    removePictureText:{
        marginHorizontal:5,
        color:'#4d0909',
        fontWeight:'bold'
    }

})