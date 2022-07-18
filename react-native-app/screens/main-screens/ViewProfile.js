import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View,Image, StyleSheet, Dimensions, TouchableNativeFeedback, ScrollView, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/global";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { localhost } from "../../globalVariables";
import Skills from "../../components/new-user-components/skills/Skills";
import SkillCard from "../../components/new-user-components/skills/SkillCard";
import { FontAwesome } from '@expo/vector-icons';


const ViewProfile = ({route}) => {

    const navigation = useNavigation()

    const [user,setUser] = useState(route.params.user) 
    const [signedInUser,setSignedInUser] = useState('')

    //track user's activities (About and Skills)
    const [about,setAbout] = useState('')
    const [skills,setSkills]= useState([])

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
            <TouchableOpacity style={globalStyles.whatsappButtonContainer}>
                <FontAwesome name="whatsapp" size={24} color="#6adb00" style={{marginRight:5}}/>
                <Text style={globalStyles.whatsappButtonText}>WhatsApp Message</Text>
            </TouchableOpacity>
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
    }
})