import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { globalStyles } from "../../../styles/global";

const Skills = () => {

    //track skills input
    const [skill,setSkill] = useState('')
    const [skills,setSkills] = useState([])

    return (
        <View>

            <View style={globalStyles.inputContainer}>
                    <Text style={globalStyles.inputLabel}>Enter you skills <Text style={styles.grayedOut}>(max. 5)</Text></Text>
                    <TextInput
                    style={globalStyles.input}
                    placeholder="Drawing, Hiking..."
                    multiline
                    />
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
    }
})