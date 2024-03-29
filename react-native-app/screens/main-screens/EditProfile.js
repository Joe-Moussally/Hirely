import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import EditProfileSkills from "../../components/profile-components/EditProfileSkills";
import { localhost } from "../../globalVariables";
import { globalStyles } from "../../styles/global";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';


const EditProfile = ({route}) => {

    const navigation = useNavigation()

    const [about,setAbout] = useState(route.params.about)
    //track length of about
    const [aboutLength,setAboutLength] = useState(0)

    //track the user's id and credentials on successful login
    const [name,setName] = useState(route.params.name)

    //track skills array
    const [skillsArray,setSkillsArray] = useState(route.params.skills)

    const handleUpdate = () => {

        //get user's token then update the profile
        AsyncStorage.getItem('token').then((token) => {

            axios({
                headers:{'Authorization':'Bearer '+token,},
                method:'PUT',
                url:'http://'+localhost+':8000/api/',
                data:{
                    name:name,
                    about:about,
                    skills:JSON.stringify(skillsArray)
                }
            }).then(res => {
                console.log(res.data)
                navigation.navigate('ProfileStack',{changed:true})
            }).catch(err => {
                console.warn(err);
            })
        })
    }

    return (
        
        <View style={globalStyles.container}>
            
            <View style={styles.headerContainer}>
                <TouchableOpacity
                onPress={() => {navigation.pop()}}>
                    <AntDesign name="back" size={24} color="black" style={{marginRight:20}}/>
                </TouchableOpacity>
                <Text style={globalStyles.blueTitle}>Profile Activities</Text>
            </View>

            <ScrollView>

                
                <View style={globalStyles.inputContainer}>
                    <Text style={globalStyles.inputLabel}>Change your Full Name</Text>
                    <TextInput
                    style={globalStyles.input}
                    placeholder="Jim Carrey"
                    multiline
                    value={name}
                    onChangeText={setName}
                    />
                </View>


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
                    <Text style={globalStyles.fullWidthButtonText}>Update Profile</Text>
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
    },
    headerContainer:{
        flexDirection:'row',
        alignItems:'center'
    }
})