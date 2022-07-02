import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { globalStyles } from "../../styles/global";

const AddJob = () => {

    //initializing job offer inputs
    const [position,setPosition] = useState('')
    const [description,setDescription] = useState('')

    //track all requirements
    const [requirements,setRequirements] = useState([])
    //track a single requirement
    const [requirement,setRequirement] = useState('')

    return (
        <ScrollView>
        <View style={styles.formContainer}>
            
            <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.inputLabel}>Job title <Text style={styles.required}>(Required)</Text></Text>
                <TextInput
                style={globalStyles.input}
                placeholder="Electrician, Teacher, ..."
                onChangeText={text=> setPosition(text)}/>
            </View>

            <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.inputLabel}>Job description</Text>
                <TextInput
                style={[globalStyles.input,styles.mulitline]}
                placeholder="Enter job description here"
                multiline
                onChangeText={text=> setDescription(text)}/>
            </View>

            <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.inputLabel}>Job requirements</Text>
                <TextInput
                style={globalStyles.input}
                placeholder="Enter job requirement here"
                multiline
                onChangeText={text=> setRequirement(text)}/>
            </View>

            <TouchableOpacity style={globalStyles.outlineButton}>
                <Text style={globalStyles.outlineButtonText}>Add Requirement</Text>
            </TouchableOpacity>

            <TouchableOpacity style={globalStyles.fullWidthButton}>
                <Text style={globalStyles.fullWidthButtonText}>Post Job Offer</Text>
            </TouchableOpacity>

        </View>
        </ScrollView>
     );
}
 
export default AddJob;

const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        backgroundColor:'white',
        padding:20
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