import { TabRouter, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Skills from "../../components/new-user-components/skills/Skills";
import EditProfileSkills from "../../components/profile-components/EditProfileSkills";
import { localhost } from "../../globalVariables";
import { globalStyles } from "../../styles/global";

const EditProfile = ({route}) => {

    const navigation = useNavigation()

    const [about,setAbout] = useState(route.params.about)
    //track length of about
    const [aboutLength,setAboutLength] = useState(0)

    //track the user's id and credentials on successful login
    const [user,setUser] = useState('')

    //track skills array
    const [skillsArray,setSkillsArray] = useState(route.params.skills)

    const handleUpdate = () => {

        // // 1) adding the email and password of the user
        // axios({

        //     headers: { 'Content-Type':'multipart/form-data;' },
        //     method:'POST',
        //     url:'http://'+localhost+':8000/api/register',
        //     data:route.params.FormData,

        // }).then((Response)=>{
        //     setUser(Response.data.user)


        //     // 2) adding the skills and about with the new user id
        //     let data = new FormData()
        //     data.append('skills',JSON.stringify(skillsArray))
        //     data.append('about',about)

        //     //adding skills
        //     axios({
        //         headers: { 'Content-Type':'multipart/form-data;' },
        //         method:'POST',
        //         url:'http://'+localhost+':8000/api/activities/'+Response.data.user.id,
        //         data:data
        //     }).then(res=>{
        //         console.log(res.data)
        //         navigation.pop()
        //         navigation.pop()
        //         navigation.navigate('LogIn')
        //     }).catch(err=>console.warn(err.response.status))

        //     //adding about

        // }).catch((Error) => {
        //     console.warn(Error.response.status)
        // })
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
                <EditProfileSkills setSkillsArray={setSkillsArray} skillsArray={skillsArray} removable={true}/>

                <TouchableOpacity
                style={globalStyles.fullWidthButton}
                onPress={handleUpdate}>
                    <Text style={globalStyles.fullWidthButtonText}>Complete Profile</Text>
                </TouchableOpacity>
            
            </ScrollView>
            
        </View>
    );
}
 
export default EditProfile;

const styles = StyleSheet.create({
    characterCoutner:{
        color:'gray',
        marginLeft:5
    }
})