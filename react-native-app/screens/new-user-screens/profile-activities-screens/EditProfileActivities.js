import { TabRouter, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Skills from "../../../components/new-user-components/skills/Skills";
import { localhost } from "../../../globalVariables";
import { globalStyles } from "../../../styles/global";

const EditProfileActivities = ({route,setAppToken}) => {

    const navigation = useNavigation()

    const [about,setAbout] = useState('')
    //track length of about
    const [aboutLength,setAboutLength] = useState(0)

    //track the user's id and credentials on successful login
    const [user,setUser] = useState('')

    //track skills array
    const [skillsArray,setSkillsArray] = useState([])

    const handleSignUp = () => {

        // 1) adding the email and password of the user
        axios({

            headers: { 'Content-Type':'multipart/form-data;' },
            method:'POST',
            url:'http://'+localhost+':8000/api/register',
            data:route.params.FormData,

        }).then((Response)=>{
            setUser(Response.data.user)

            // 2) adding the skills with the new user id
            let skillsData = new FormData()
            skillsData.append('skills',JSON.stringify(skillsArray))
            console.log('SKKKILLLLSSSS',skillsArray)
            axios({
                headers: { 'Content-Type':'multipart/form-data;' },
                method:'POST',
                url:'http://'+localhost+':8000/api/skills/'+Response.data.user.id,
                data:skillsData
            }).then(res=>{
                console.log(res.data)
                navigation.navigate('Splash')
            }).catch(err=>console.warn(err.response.status))

        }).catch((Error) => {

            console.warn(Error.response.status)

        })



        
        // 3) set the user token to redirect to the main app navigation
    }

    return (
        
        <View style={globalStyles.container}>

            <Text style={globalStyles.blueTitle}>Profile Activities</Text>

            <ScrollView>

                

                <View style={globalStyles.inputContainer}>
                    <Text style={globalStyles.inputLabel}>Describe yourself in a few words</Text>
                    <TextInput
                    style={globalStyles.input}
                    placeholder="Describe yourself..."
                    multiline
                    value={about}
                    onChangeText={about=> {        
                        if(about.length<150) {
                            setAbout(about)
                        }
                        setAboutLength(about.length)
                    }}
                    />
                    <Text style={styles.characterCoutner}>{aboutLength}/150</Text>
                </View>

                {/* Skills section */}
                <Skills setSkillsArray={setSkillsArray}/>

                <TouchableOpacity
                style={globalStyles.fullWidthButton}
                onPress={handleSignUp}>
                    <Text style={globalStyles.fullWidthButtonText}>Complete Profile</Text>
                </TouchableOpacity>
            
            </ScrollView>
            
        </View>
        
    );
}
 
export default EditProfileActivities;

const styles = StyleSheet.create({
    characterCoutner:{
        color:'gray',
        marginLeft:5
    }
})