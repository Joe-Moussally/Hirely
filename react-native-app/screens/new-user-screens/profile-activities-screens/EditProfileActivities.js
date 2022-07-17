import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Skills from "../../../components/new-user-components/skills/Skills";
import { globalStyles } from "../../../styles/global";

const EditProfileActivities = () => {

    const [about,setAbout] = useState('')
    //track length of about
    const [aboutLength,setAboutLength] = useState(0)

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
                <Skills />
            
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