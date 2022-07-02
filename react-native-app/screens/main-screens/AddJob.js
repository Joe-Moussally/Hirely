import { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { globalStyles } from "../../styles/global";

const AddJob = () => {

    //initializing job offer inputs
    const [position,setPosition] = useState('')
    const [description,setDescription] = useState('')

    return ( 
        <View style={styles.formContainer}>
            
            <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.inputLabel}>Job title</Text>
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

        </View>
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
    }
})