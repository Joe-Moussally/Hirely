import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Checkbox from 'expo-checkbox'
import Requirement from "../../components/Requirement";
import { globalStyles } from "../../styles/global";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { localhost } from "../../globalVariables";
import axios from 'axios'
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import ScreenHeader from "../../components/ScreenHeader";

const AddJob = () => {

    const navigation = useNavigation()

    //initializing job offer inputs
    const [position,setPosition] = useState('')
    const [description,setDescription] = useState('')

    //track all requirements
    const [requirements,setRequirements] = useState([])
    //track a single requirement
    const [requirement,setRequirement] = useState('')

    //track boolean value for payment info
    const [addSalaryInfo,setAddSalaryInfo] = useState(false)
    const [salaryPeriod,setSalaryPeriod] = useState('hour')
    const [salary,setSalary] = useState('')

    //track requirement keys
    const [key,setKey] = useState(0)

    //track error messages displayed on screen
    const [errorMessage, setErrorMessage] = useState('')

    // function to handle requirements adding
    const addRequirement = () => {
        if (!requirement) return
        setRequirements([...requirements,{key:key, text:requirement}])
        setKey(key+1)
        setRequirement('')//clear input
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
        data.append('salary',salary)
        data.append('salary_period',salaryPeriod)

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
            
            <ScreenHeader text="Add Job"/>

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

            {/* Job Salary info */}
            <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.inputLabel}>Job Salary</Text>

                <View style={styles.addSalaryContainer}>
                    <Checkbox
                    style={styles.checkbox}
                    value={addSalaryInfo}
                    onValueChange={setAddSalaryInfo}
                    color={addSalaryInfo ? '#00bbff' : undefined}/>
                    <Text style={styles.addSalaryText}>Add salary information</Text>
                </View>

                {
                    addSalaryInfo?
                    <View style={styles.salaryInfoContainer}>
                        <TextInput
                        keyboardType="number-pad"
                        value={salary}
                        onChangeText={setSalary}
                        style={styles.salaryInput}/>
                        <Text style={styles.dollarSign}>$/</Text>
                        <Picker
                        selectedValue={salaryPeriod}
                        onValueChange={setSalaryPeriod}
                        
                        style={{width:'40%'}}
                        >
                            <Picker.item value="hour" label="Hour" />
                            <Picker.item value="month" label="Month" />
                            <Picker.item value="year" label="Year" />
                        </Picker>
                    </View>:
                    <></>
                }

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
            style={styles.addSkillButton}
            onPress={addRequirement}
            >
                <Text style={styles.addSkillButtonText}>Add Requirement</Text>
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

            {/* Error Message Text */
                errorMessage?
                <View style={globalStyles.errorMessageContainer}>
                    <Text style={globalStyles.errorMessage}>{errorMessage}</Text>
                </View>:<></>
            }

            

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
    },
    checkbox:{
        margin:8
    },
    addSalaryContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    addSalaryText:{
        color:'#696969'
    },
    salaryInfoContainer:{
        borderWidth:2,
        borderRadius:10,
        borderColor:'#004f70',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    salaryInput:{
        fontSize:21,
        padding:10,
        width:'40%'
    },
    dollarSign:{
        fontSize:22,
        color:'#6e6e6e'
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