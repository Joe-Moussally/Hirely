import { useEffect, useState } from "react";
import { StyleSheet, Text,View,TextInput,TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/global";
import SkillCard from "../new-user-components/skills/SkillCard";

const EditProfileSkills = ({setSkillsArray,skillsArray}) => {

    //track skills input
    const [skill,setSkill] = useState('')
    const [skills,setSkills] = useState(skillsArray)
    const [skillLength,setSkillLength] = useState(0)
    //track skill key in array
    const [key,setKey] = useState(0)

    useEffect(()=>{
        //fixing bug not considering last elements
        setSkills([...skills])
        setSkillsArray(skills)
    },[skills.length])

    //function to handle removing skill from array
    const removeSkill = (key) => {
        //find the index of skill
        setSkills(skills.filter((element) => element.skill !== key))
        console.log(skills)
    }
    
    //function to add skill to array of skills
    const addSkill = () => {
        if (!skill) return //if input is empty
        if(skills.length>5) return //warn user max 6 skills
        setSkills(prevSkills => [...prevSkills,{key:key, skill:skill}])
        // setSkills(skills)
        setSkillsArray(skills) //update state in parent component (form)
        setKey(key+1)
        setSkill('')//clear input
        setSkillLength(0)
        console.log(skills)
    }

    return (
        <View>

            <View style={globalStyles.inputContainer}>
                    <Text style={globalStyles.inputLabel}>Enter your skills <Text style={styles.grayedOut}>(max. 6)</Text></Text>
                    <TextInput
                    style={globalStyles.input}
                    placeholder="Drawing, Hiking..."
                    multiline={false}
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
                        <View style={globalStyles.fullWidthOutlineButton}>
                            <Text style={globalStyles.fullWidthOutlineButtonText}>Add Skill</Text>
                        </View>
                    </TouchableOpacity>
            </View>

            {/* Skills cards container */}
            <View style={globalStyles.skillsContainer}>
                    {
                        skills.map((element => 
                        <SkillCard
                        skill={element.skill}
                        key={element.skill}
                        removable={true}
                        removeSkill={() => removeSkill(element.skill)}/>))
                    }
            </View>

        </View>
    );
}
 
export default EditProfileSkills;

const styles = StyleSheet.create({
    grayedOut:{
        fontStyle:'italic',
        color:'gray',
        fontWeight:'normal'
    },
    characterCoutner:{
        color:'gray',
        marginLeft:5
    },
})