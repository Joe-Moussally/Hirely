import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View,Image, StyleSheet, Dimensions, TouchableNativeFeedback, ScrollView, TouchableOpacity, Linking } from "react-native";
import { globalStyles } from "../../styles/global";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { localhost } from "../../globalVariables";
import SkillCard from "../../components/new-user-components/skills/SkillCard";
import { FontAwesome,Ionicons } from '@expo/vector-icons';


const ViewProfile = ({route}) => {

    const navigation = useNavigation()

    const [user,setUser] = useState(route.params.user) 
    const [signedInUser,setSignedInUser] = useState('')

    //track user's activities (About and Skills)
    const [about,setAbout] = useState('')
    const [skills,setSkills]= useState([])

    //whatsapp message
    let whatsappMessage = 'Hello '+user.name+'! My name is '+signedInUser.name+' and I saw that you are interested in our job offer.'

    useEffect(()=>{
        AsyncStorage.getItem('user').then(obj=>{
            setSignedInUser(JSON.parse(obj))
        })

        axios({
            method:'GET',
            url:'http://'+localhost+':8000/api/activities/'+route.params.user.id,
        }).then(res => {
            
            setAbout(res.data.about)
            setSkills(res.data.skills)
            console.log('SKILLS',skills)
        })
    },[])

    return (
        
        <View style={[globalStyles.container,{backgroundColor:'white'}]}>
        <ScrollView>

            {
                user.picture_base64?
                <Image
                style={globalStyles.profilePicture}
                source={{uri:'data:image/png;base64,'+user.picture_base64}}/>:
                <Image
                style={globalStyles.profilePicture}
                source={require('../../assets/profile/default_picture.jpg')}/>
            }

            <Text style={styles.username}>{user.name}</Text>

            {
                //user's about
                about?
                <View style={globalStyles.sectionContainer}>
                    <Text style={globalStyles.sectionTitle}>About</Text>
                    <Text style={globalStyles.sectionBody}>{about}</Text>
                </View>:
                <></>
            }

            {
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

            <View style={styles.getInTouchTextContainer}>
                <Text style={styles.getInTouchText}>Get In Touch</Text>
            </View>

            <View style={styles.getInTouchContainer}>

                {/* Message Button */}
                <TouchableNativeFeedback onPress={() => {
                    navigation.pop()
                    navigation.pop()
                    navigation.navigate('Chats',{
                        screen:'ChatStack',
                        params: {
                            contact:route.params.user,
                            user:signedInUser
                        }
                    })
                    }}>
                    <View style={globalStyles.outlineButton}>
                        <Text style={globalStyles.outlineButtonText}>Message</Text>
                    </View>
                </TouchableNativeFeedback>

                {/* Message on whatsapp */}
                <TouchableOpacity
                style={globalStyles.whatsappButtonContainer}
                onPress={() => Linking.openURL('whatsapp://send?text='+whatsappMessage+'&phone='+user.number)}>
                    <FontAwesome name="whatsapp" size={24} color="#6adb00" style={{marginRight:5}}/>
                    <Text style={globalStyles.whatsappButtonText}>WhatsApp Message</Text>
                </TouchableOpacity>

                {/* Call applicant's number */}
                <TouchableOpacity
                style={globalStyles.callButtonContainer}
                onPress={() => Linking.openURL('tel:'+user.number)}>
                    <Ionicons name="ios-call" size={24} color="#6e6e6e" style={{marginRight:5}}/>
                    <Text style={globalStyles.callButtonText}>Phone Call</Text>
                </TouchableOpacity>

            </View>

        </ScrollView>
        </View>
        
    );
}
 
export default ViewProfile;

const styles = StyleSheet.create({
    username:{
        fontSize:26,
        fontWeight:'600',
        alignSelf:'center',
        margin:20
    },
    getInTouchText:{
        alignSelf:'center',
        fontSize:21,
        fontWeight:'bold',
        color:'#205a8a',
        
    },
    getInTouchTextContainer:{
        backgroundColor:'white',
        transform:[{translateY:17}],
        zIndex:1,
        width:200,
        alignSelf:'center'
    },
    getInTouchContainer:{
        borderWidth:1,
        borderColor:'#bfbfbf',
        paddingVertical:30,
        borderRadius:20,
        zIndex:0
    }
})