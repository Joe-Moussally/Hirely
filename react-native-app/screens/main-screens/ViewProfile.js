import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View,Image, StyleSheet, Dimensions, TouchableNativeFeedback, ScrollView, TouchableOpacity, Linking } from "react-native";
import { globalStyles } from "../../styles/global";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { localhost } from "../../globalVariables";
import SkillCard from "../../components/new-user-components/skills/SkillCard";
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import ScreenHeader from "../../components/ScreenHeader";


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
        
        <View style={{flex:1}}>

            <ScreenHeader text={user.name+"'s Profile"}/>
            
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

                {/* GET IN TOUCH SECTION */}
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
                        <View style={styles.messageButton}>
                            <Text style={styles.messageButtonText}>Message</Text>
                        </View>
                    </TouchableNativeFeedback>

                    {/* Message on whatsapp */}
                    <TouchableOpacity
                    style={styles.whatsappButton}
                    onPress={() => Linking.openURL('whatsapp://send?text='+whatsappMessage+'&phone='+user.number)}>
                        <FontAwesome name="whatsapp" size={24} color="white" style={{marginRight:5}}/>
                        <Text style={styles.whatsappButtonText}>WhatsApp Message</Text>
                    </TouchableOpacity>

                    {/* Call applicant's number */}
                    <TouchableOpacity
                    style={styles.callButton}
                    onPress={() => Linking.openURL('tel:'+user.number)}>
                        <Ionicons name="ios-call" size={24} color="white" style={{marginRight:5}}/>
                        <Text style={styles.callButtonText}>Phone Call</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
            </View>
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
    },
    //get in touch buttons
    messageButton:{
        backgroundColor:'#0086d9',
        width:'85%',
        alignSelf:'center',
        paddingVertical:7,
        borderRadius:10,
        marginVertical:10,
        elevation:2
    },
    messageButtonText:{
        fontSize:21,
        fontWeight:'bold',
        color:'white',
        textAlign:'center'
    },
    //whatsapp button
    whatsappButton:{
        backgroundColor:'#32c700',
        width:'85%',
        alignSelf:'center',
        paddingVertical:7,
        borderRadius:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginVertical:10,
        elevation:2
    },
    whatsappButtonText:{
        fontSize:21,
        fontWeight:'bold',
        color:'white',
        textAlign:'center'
    },
    //phone call button
    callButton:{
        backgroundColor:'#858585',
        width:'85%',
        alignSelf:'center',
        paddingVertical:7,
        borderRadius:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginVertical:10,
        elevation:2
    },
    callButtonText:{
        fontSize:21,
        fontWeight:'bold',
        color:'white',
        textAlign:'center'
    }
})