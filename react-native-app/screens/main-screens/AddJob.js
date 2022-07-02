import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native";
import Requirement from "../../components/Requirement";
import { globalStyles } from "../../styles/global";

const AddJob = () => {

    //initializing job offer inputs
    const [position,setPosition] = useState('')
    const [description,setDescription] = useState('')

    //track all requirements
    const [requirements,setRequirements] = useState([])
    //track a single requirement
    const [requirement,setRequirement] = useState('')

    //track requirement keys
    const [key,setKey] = useState(0)

    // function to handle requirements adding
    const addRequirement = () => {
        setRequirements([{key:key, text:requirement},...requirements])
        setKey(key+1)
        console.log(key)
    }

    //function that remove the requirement from the list
    const removeRequirement = (key) => {
        setRequirements(requirements.filter((element) => element.key !== key))
        console.log(key)
    }

    return (
        
        <View style={styles.formContainer}>
            <ScrollView>
            
            {/* JOB TITLE */}
            <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.inputLabel}>Job title <Text style={styles.required}>(Required)</Text></Text>
                <TextInput
                style={globalStyles.input}
                placeholder="Electrician, Teacher, ..."
                onChangeText={text=> setPosition(text)}/>
            </View>

            {/* JOB DESCRIPTION */}
            <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.inputLabel}>Job description</Text>
                <TextInput
                style={[globalStyles.input,styles.mulitline]}
                placeholder="Enter job description here"
                multiline
                onChangeText={text=> setDescription(text)}/>
            </View>

            {/* JOB REQUIREMENTS */}
            <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.inputLabel}>Job requirements</Text>
                <TextInput
                style={globalStyles.input}
                placeholder="Enter job requirement here"
                multiline
                onChangeText={text=> setRequirement(text)}/>
            </View>

            <TouchableOpacity
            style={globalStyles.outlineButton}
            onPress={addRequirement}
            >
                <Text style={globalStyles.outlineButtonText}>Add Requirement</Text>
            </TouchableOpacity>
        
            {/* JOB REQUIREMENTS DISPLAY */}
            <View style={globalStyles.inputContainer}>
                {
                    requirements.map((req) => (
                        <Requirement
                        text={req.text}
                        key={req.key}
                        removeRequirement={() => removeRequirement(req.key)}/>
                    ))
                }
            </View>

            <TouchableOpacity style={globalStyles.fullWidthButton}>
                <Text style={globalStyles.fullWidthButtonText}>Post Job Offer</Text>
            </TouchableOpacity>

            </ScrollView>
        </View>
        
     );
}
 
export default AddJob;

const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        backgroundColor:'white',
        paddingHorizontal:20
    },
    mulitline:{
        minHeight:150,
        textAlignVertical:"top"
    },
    required:{
        color:'gray',
        fontStyle:'italic'
    }
})