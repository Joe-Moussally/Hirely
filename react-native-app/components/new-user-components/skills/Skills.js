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

    useEffect(()=>{
        //fixing bug not considering last elements
        setSkills([...skills])
        setSkillsArray(skills)
    },[skillLength])
    
    //function to add skill to array of skills
    const addSkill = () => {
        if (!skill) return //if input is empty
        if(skills.length>5) return //warn user max 6 skills
        setSkills(prevSkills => [...prevSkills,{key:key, text:skill}])
        // setSkills(skills)
        setSkillsArray(skills) //update state in parent component (form)
        setKey(key+1)
        setSkill('')//clear input
        setSkillLength(0)
        console.log(skills)
    }

    //function to handle removing skill from array
    const removeSkill = (key) => {
        //find the index of skill
        setSkills(skills.filter((element) => element.key !== key))
        console.log(skills)
    }

    return (
        <View>

            <View style={globalStyles.inputContainer}>
                    <Text style={globalStyles.inputLabel}>Enter you skills <Text style={styles.grayedOut}>(max. 6)</Text></Text>
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
                        <View style={styles.addSkillButton}>
                            <Text style={styles.addSkillButtonText}>Add Skill</Text>
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
    },
    addSkillButton:{
        width:'100%',
        borderColor:'#00aeff',
        borderRadius:10,
        borderWidth:4,
        color:'red',
        marginVertical:10,
        marginHorizontal:'7.5%',
        paddingVertical:7,
        alignSelf:'center'
    },
    addSkillButtonText:{
        color:'#00aeff',
        fontWeight:'bold',
        textAlign:'center',
        fontSize:19
    }
})