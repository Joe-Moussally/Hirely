import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from 'react-native';
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View, TouchableOpacity } from "react-native";

import axios from 'axios';
import { localhost } from "../../globalVariables";
import { globalStyles } from "../../styles/global";
import { useNavigation } from "@react-navigation/native";

import InterestButton from "../../components/buttons/InterestButton";
import RemoveOfferButton from "../../components/buttons/RemoveOfferButton";
import InterestedApplicantsList from "../../components/InterestedApplicantsList";


const JobDetails = ({route}) => {
    const navigation = useNavigation()

    //job details
    const [details,setDetails] = useState('')
    
    //track logged in user to hide non related component
    const [userId,setUserId] = useState('')

    //check if user already applied for the job
    const [interested,setIntersted] = useState(false)

    useEffect(()=>{
        console.log("BEFOREEEE",interested)

        //get user's id
        const getUserId = async () => {
            await AsyncStorage.getItem('user').then((user)=> setUserId(JSON.parse(user).id))//logged in user id
        }

        
        //function to check if user is interested
        const checkIsInterested = async () => {
            //check if user is already is interested in offer
            await AsyncStorage.getItem('token').then((token) => {
                axios({
                    headers:{'Authorization':'Bearer '+token},
                    method:'GET',
                    url:'http://'+localhost+':8000/api/interests/user/'+route.params.id
                }).then((Response) => {
                    if(Response.data.interested) {
                        console.log("ISSS INTERESTED")
                        setIntersted(true)
                    }
                    console.log("AFTERRRRRRRR",interested)
                })
            })
        }
        checkIsInterested()

        getUserId()

        //fetch offer detail and requirements
        axios({
            method:'GET',
            url:'http://'+localhost+':8000/api/offers/'+route.params.id //offer id
        }).then(async (Response) => {
            setDetails(Response.data)
        }).catch((err)=>{
            console.log("ERROR JOB DETAILS")
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
                    details.user.picture?
                    <Image source={{uri:details.user.picture}} style={styles.picture}/>:
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
                <Text style={styles.textDetails}>{route.params.address}</Text>

            </View>

            {/* description */}
            {
                //checking if job details record exists
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
                <RemoveOfferButton offerId={route.params.id}/>
                :<></>
            }


            {/* Interested Button */}
            {
                (userId != details.user['id'])?
                <InterestButton
                interested={interested}
                setInterested={setIntersted}
                offerId={route.params.id}/>:
                <></>
            }
            

            {/* interested applicants section */}
            {
                (userId != details.user['id'])?
                <></>:
                <InterestedApplicantsList offerId={route.params.id}/>
            }
            

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
        width:'55%',
        aspectRatio:1/1,
        borderRadius:Dimensions.get('window').width/2,
        borderWidth:2,
        borderColor:'#0096ed',
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
})