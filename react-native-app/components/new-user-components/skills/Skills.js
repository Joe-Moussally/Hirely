import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../../styles/global";
import SkillCard from "./SkillCard";

const Skills = ({ setSkillsArray }) => {

    //track skills input
    const [skill,setSkill] = useState('')
    const [skills,setSkills] = useState([])
    const [skillLength,setSkillLength] = useState(0)
    //track skill key in array
    const [key,setKey] = useState(0)

    useEffect(()=>{console.log(skills)},[])
    
    //function to add skill to array of skills
    const addSkill = () => {
        if (!skill) return //if input is empty
        if(skills.length>4) return //warn user max 5 skills
        setSkills(prevSkills => [...prevSkills,{key:key, text:skill}])
        setSkillsArray(skills) //update state in parent component (form)
        setKey(key+1)
        setSkill('')//clear input
        setSkillLength(0)
    }

    //function to handle removing skill from array
    const removeSkill = (key) => {
        //find the index of skill
        setSkills(skills.filter((element) => element.key !== key))
    }

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

                    <TouchableOpacity
                    onPress={addSkill}>
                        <View style={globalStyles.outlineButton}>
                            <Text style={globalStyles.outlineButtonText}>Add Skill</Text>
                        </View>
                    </TouchableOpacity>
            </View>

            {/* Skills cards container */}
            <View style={globalStyles.skillsContainer}>
                    {
                        skills.map((element => 
                        <SkillCard
                        skill={element.text}
                        key={element.key}
                        removable={true}
                        removeSkill={() => removeSkill(element.key)}/>))
                    }
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