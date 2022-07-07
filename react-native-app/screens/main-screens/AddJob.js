import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Requirement from "../../components/Requirement";
import { globalStyles } from "../../styles/global";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { localhost } from "../../globalVariables";
import axios from 'axios'
import { useNavigation } from "@react-navigation/native";

const AddJob = () => {

    const navigation = useNavigation()

    //initializing job offer inputs
    const [position,setPosition] = useState('')
    const [description,setDescription] = useState('')

    //track all requirements
    const [requirements,setRequirements] = useState([])
    //track a single requirement
    const [requirement,setRequirement] = useState('')

    //track requirement keys
    const [key,setKey] = useState(0)

    //track error messages displayed on screen
    const [errorMessage, setErrorMessage] = useState('')

    // function to handle requirements adding
    const addRequirement = () => {
        if (!requirement) return
        setRequirements([...requirements,{key:key, text:requirement}])
        setKey(key+1)
        
        //clear input
        setRequirement('')
    }

    //function that remove the requirement from the list
    const removeRequirement = (key) => {
        setRequirements(requirements.filter((element) => element.key !== key))
    }

    //function that runs when user presses add offer
    const handleAdd = async () => {

        //getting the user's Id
        let userId = await AsyncStorage.getItem('user').then((val)=>(
            JSON.parse(val)['id']
        ))
        
        //if job title input is empty
        if(!position) {
            setErrorMessage('Job title is required')
            return
        } else setErrorMessage('')

        // console.log(position, description,requirements)

        let data = new FormData()

        data.append('user_id',userId)
        data.append('position',position)
        data.append('description',description)
        data.append('requirements',JSON.stringify(requirements))

        console.log("REQUIREMENTSS ADD",requirements)

        axios({

            headers: { 'Content-Type':'multipart/form-data;' },
            method:'POST',
            url:'http://'+localhost+':8000/api/offers/',
            data:data

        }).then(Response => {
            console.log('ADDED',Response.data['offer'])
            navigation.navigate('MyJobsStack',{offer:Response.data['offer']})
        }).catch(err => {
            console.log('ADD JOB',err.response.status)
        })
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
                onChangeText={text=> setRequirement(text)}
                >
                    {requirement}
                </TextInput>

            </View>

            {/* Add Requirement button */}
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

            {/* Error Message Text */}
            <Text style={styles.error}>{errorMessage}</Text>

            {/* Post Job Offer Button */}
            <TouchableOpacity
            style={globalStyles.fullWidthButton}
            onPress={handleAdd}>
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
    },
    error:{
        color:'crimson',
        alignSelf:'center',
        fontSize:17,
    }
})