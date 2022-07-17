import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../../styles/global";

const Skills = ({ setSkillsArray }) => {

    //track skills input
    const [skill,setSkill] = useState('')
    const [skills,setSkills] = useState([])
    const [skillLength,setSkillLength] = useState(0)

    return (
        <View>

            <View style={globalStyles.inputContainer}>
                    <Text style={globalStyles.inputLabel}>Enter you skills <Text style={styles.grayedOut}>(max. 5)</Text></Text>
                    <TextInput
                    style={globalStyles.input}
                    placeholder="Drawing, Hiking..."
                    multiline
                    value={skill}
                    onChangeText={text => {
                        if(text.length < 20) {
                            setSkill(text)
                        }
                        setSkillLength(text.length)
                    }}
                    />
                    <Text style={styles.characterCoutner}>{skillLength}/20</Text>

                    <TouchableOpacity>
                        <View style={globalStyles.outlineButton}>
                            <Text style={globalStyles.outlineButtonText}>Add Skill</Text>
                        </View>
                    </TouchableOpacity>
            </View>

            {/* Skills cards container */}
            <View style={globalStyles.skillsContainer}>

            </View>

        </View>
    );
}
 
export default Skills;

const styles = StyleSheet.create({
    grayedOut:{
        fontStyle:'italic',
        color:'gray',
        fontWeight:'normal'
    },
    characterCoutner:{
        color:'gray',
        marginLeft:5
    }
})