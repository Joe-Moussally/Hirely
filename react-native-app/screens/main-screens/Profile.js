import { Button, Image, StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { localhost } from "../../globalVariables";
import { globalStyles } from "../../styles/global";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import WebView from "react-native-webview"; // used for pdf display
import PdfReader from "rn-pdf-reader-js"; // used for pdf display
import axios from "axios";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import SkillCard from "../../components/new-user-components/skills/SkillCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MenuProvider, MenuOption, MenuOptions, MenuTrigger, Menu } from "react-native-popup-menu";

export default function Profile({ setTokenApp }) {

    const navigation = useNavigation()
    const route = useRoute()

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

    },[image,route.params])

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
        AsyncStorage.getItem('token').then((token) => {
            axios({
                headers:{
                    'Authorization':'Bearer '+token
                },
                method:'POST',
                url:'http://'+localhost+':8000/api/remove_picture',
            }).then(() => {
                setImage('')
            })
        })
    }

    return (
        user?
        <ScrollView style={{backgroundColor:'white'}}>
        <View style={styles.profileContainer}>

        {/* Display Menu for logout option */}
        
            <Menu>
            <MenuTrigger text='Select action' />
            <MenuOptions>
                <MenuOption onSelect={() => alert(`Save`)} text='Save' />
                <MenuOption onSelect={() => alert(`Delete`)} >
                <Text style={{color: 'red'}}>Delete</Text>
                </MenuOption>
                <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
            </MenuOptions>
            </Menu>
        

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
                        <AntDesign name="picture" size={16} color="#2a4d09" />      
                        <Text style={styles.changePictureText}>Change Picture</Text>
                    </View>
                </TouchableOpacity>

                {
                    user.picture_base64?
                    <TouchableOpacity onPress={removePicture}>
                        <View style={styles.removePictureContainer}>
                            <AntDesign name="close" size={16} color="black" />      
                            <Text style={styles.removePictureText}>Remove Picture</Text>
                        </View>
                    </TouchableOpacity>:<></>
                }



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
                                <SkillCard removable={false} skill={element.skill} key={element.skill}/>
                            ))
                        }
                    </View>

                </View>:
                <></>
            }

            {/* Upload CV Button OR View CV Button
            {
                !user.cv_base64?
                <TouchableNativeFeedback
                onPress={fetchPDF}>
                    <View style={globalStyles.outlineButton}>
                        <Text style={globalStyles.outlineButtonText}>Upload CV</Text>
                    </View>
                </TouchableNativeFeedback>:
                <></>
            } */}

            {/* {
                user.cv_base64?
                <WebView
                originWhitelist={['*']} 
                source={{uri:'data:application/pdf;base64,'+user.cv_base64}}
                style={{height:200,width:200,borderWidth:1,borderColor:'black',alignSelf:'center'}}/>:
                <></>
            } */}

            {/* <PdfReader
            source={{base64:'data:application/pdf;base64,'+Base64.atob(user.cv_base64)}}
            style={{height:200,width:'80%'}}/> */}
            
            {/* Edit Profile Activites Button */}
            <TouchableOpacity
            style={globalStyles.outlineButton}
            onPress={() => {
                navigation.push('EditStack',{name:user.name,about:user.about,skills:skills})
            }}>
                <Text style={globalStyles.outlineButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            {/* Log Out Button */}
            {/* <TouchableNativeFeedback
            onPress={()=>setTokenApp(null)}>
                <View style={styles.logOutContainer}>
                    <MaterialIcons name="logout" size={21} color="#bf0000"/>
                    <Text style={styles.logOutText}>Log Out</Text>
                </View>
            </TouchableNativeFeedback> */}


        
        </View>
        </ScrollView>:

        <View style={globalStyles.loadingContainer}>
            <ActivityIndicator
            size={55}
            color='#00a6ff'/> 
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
        paddingBottom:70,
        paddingTop:15
    },
    changePicture:{
        alignItems:'center',
        justifyContent:'center',
        margin:12,
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
        margin:7,
        flexDirection:'row',
        backgroundColor:'#caff99',
        paddingHorizontal:9,
        paddingVertical:4,
        borderRadius:10,
    },
    changePictureText:{
        marginHorizontal:5,
        color:'#2a4d09',
        fontWeight:'bold',
        fontSize:12
    },
    removePictureContainer:{
        alignItems:'center',
        justifyContent:'center',
        margin:7,
        flexDirection:'row',
        backgroundColor:'#fc9d9d',
        paddingHorizontal:9,
        paddingVertical:4,
        borderRadius:10,
    },
    removePictureText:{
        marginHorizontal:5,
        color:'#4d0909',
        fontWeight:'bold',
        fontSize:12
    },
    logOutContainer:{
        height:40,
        width:'90%',
        alignSelf:'center',
        // backgroundColor:'#bf0000',
        marginTop:30,
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    logOutText:{
        color:'#bf0000',
        fontWeight:'bold',
        fontSize:18,
        textDecorationLine:'underline'
    }

})