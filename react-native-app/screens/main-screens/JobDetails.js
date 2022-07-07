import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View, TouchableOpacity } from "react-native";
import axios from 'axios';
import { localhost } from "../../globalVariables";
import { globalStyles } from "../../styles/global";
import { useNavigation } from "@react-navigation/native";
import InterestButton from "../../components/InterestButton";

const JobDetails = ({route}) => {
    const navigation = useNavigation()

    //job details
    const [details,setDetails] = useState('')
    
    //track logged in user to hide non related component
    const [userId,setUserId] = useState('')

    //check if user already applied for the job
    const [interested,setIntersted] = useState('')


    //function that remove the job offer from db
    const handleRemove = () => {
        
        axios({
            method:'POST',
            url:'http://'+localhost+':8000/api/offers/delete/'+route.params.id //offer id
        }).then((Response)=>{
            console.log(Response.data)
            navigation.navigate('MyJobsStack')
        })
    }

    useEffect(()=>{

        //get user's id
        const getUserId = async () => {
            await AsyncStorage.getItem('user').then((user)=> setUserId(JSON.parse(user).id))//logged in user id
        }
        getUserId()

        //fetch offer detail and requirements
        axios({
            method:'GET',
            url:'http://'+localhost+':8000/api/offers/'+route.params.id //offer id
        }).then(async (Response) => {
            console.log(' JOB DETAILS',Response.data)
            setDetails(Response.data)
        }).catch((err)=>{
            console.log("ERROR JOB DETAILS")
        })


            //check if user is already is interested in offer
            AsyncStorage.getItem('token').then((token) => {
                axios({
                    headers:{'Authorization':'Bearer '+token},
                    method:'GET',
                    url:'http://'+localhost+':8000/api/interests/user/'+route.params.id
                }).then((Response) => {
                    setIntersted(Response.data.interested)
                })
            })


    },[])

    return (

        !details
        ?<Text>Loaing</Text>
        :
        <ScrollView style={{backgroundColor:'white'}}>
        <View style={globalStyles.container}>

            {/* Job Details Header */}
            <View style={styles.header}>

                {
                    details.user['picture']?
                    <Image source={details.user['picture']}/>:
                    <Image source={require('../../assets/profile/default_picture.jpg')} style={styles.picture}/>
                }
                <Text style={styles.name}>{details.user['name']}</Text>

            </View>

            {/* postion */}
            <View style={styles.section}>

                <Text style={styles.title}>Position</Text>
                <Text style={styles.textDetails}>{details.offer['position']}</Text>

            </View>

            {/* location */}
            <View style={styles.section}>

                <Text style={styles.title}>Location</Text>
                <Text style={styles.textDetails}>Location here</Text>

            </View>

            {/* description */}
            {
                //checking if record exists
                details.offer['description']?
                <View style={styles.section}>

                    <Text style={styles.title}>Description</Text>
                    <Text style={styles.textDetails}>{details.offer['description']}</Text>

                </View>
                :<></>
            }


            {/* requirements */}
            {
                //checking if there are requirements for display
                details.requirements.length?
                <View style={styles.section}>

                    <Text style={styles.title}>Requirements</Text>
                    {
                        details.requirements.map((req) => (
                            <View style={styles.requirementsContainer}>
                                <Text style={styles.requirementText}>• {req.requirement}</Text>
                            </View>
                        ))
                    }

                </View>
                :<></>
            }
            
            {
                //check if user is the job poster
                (userId == details.user['id'])?
                
                //remove offer button
                <TouchableNativeFeedback
                onPress={handleRemove}>
                    <View style={styles.removeButton}>
                        <Text style={styles.removeButtonText}>Remove Offer</Text>
                    </View>
                </TouchableNativeFeedback>
                :<></>
            }

            {/* Interested Button */}
            
            {
                (userId != details.user['id'])?
                <InterestButton
                interested={interested}
                offerId={route.params.id}/>:
                <></>
            }

            {/* {
                //check if user is not the offer poster
                (userId != details.user['id'])?
                
                //remove offer button
                <TouchableNativeFeedback>
                    <View style={styles.removeButton}>
                        <Text style={styles.removeButtonText}>Remove Offer</Text>
                    </View>
                </TouchableNativeFeedback>
                :<></>
            } */}

        </View>
        </ScrollView>
     );
}
 
export default JobDetails;

const styles = StyleSheet.create({
    header:{
        alignItems:'center'
    },
    picture:{
        width:150,
        height:150,
        borderRadius:75,
        borderWidth:2,
        borderColor:'gray',
        margin:25
    },
    name:{
        fontSize:27,
        fontWeight:'bold',
        marginBottom:25
    },
    section:{
        marginVertical:10,
    },
    title:{
        fontWeight:'bold',
        fontSize:19,
    },
    textDetails:{
        fontSize:17,
        padding:10
    },
    requirementsContainer:{
        padding:10
    },
    requirementText:{
        fontSize:17,
    },
    removeButton:{
        backgroundColor:'crimson',
        width:'80%',
        marginHorizontal:'10%',
        height:40,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    removeButtonText:{
        fontSize:21,
        fontWeight:'bold',
        color:'white'
    },
})