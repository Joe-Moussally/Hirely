import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { globalStyles } from "../../../styles/global";

const EditProfileActivities = () => {

    const [about,setAbout] = useState('')
    //track length of about
    const [aboutLength,setAboutLength] = useState(0)

    return (
        <View style={globalStyles.container}>

            <Text style={globalStyles.blueTitle}>Profile Activities</Text>

            <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.inputLabel}>Describe yourself in a few words</Text>
                <TextInput
                style={globalStyles.input}
                placeholder="Describe yourself..."
                multiline
                value={about}
                onChangeText={about=> {        
                    if(about.length<50) {
                        setAbout(about)
                    }
                    setAboutLength(about.length)
                }}
                />
                <Text style={styles.characterCoutner}>{aboutLength}/50</Text>
            </View>

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