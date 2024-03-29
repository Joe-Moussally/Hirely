import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Dimensions } from 'react-native';
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import axios from 'axios';
import { localhost } from "../../globalVariables";
import { globalStyles } from "../../styles/global";
import { useNavigation } from "@react-navigation/native";

import InterestButton from "../../components/buttons/InterestButton";
import RemoveOfferButton from "../../components/buttons/RemoveOfferButton";
import InterestedApplicantsList from "../../components/InterestedApplicantsList";
import ScreenHeader from "../../components/ScreenHeader";

//map library
import MapView, { Marker } from 'react-native-maps'


const JobDetails = ({ route }) => {
    const navigation = useNavigation()

    //job details
    const [details,setDetails] = useState('')
    
    //track logged in user to hide non related component
    const [userId,setUserId] = useState('')

    //check if user already applied for the job
    const [interested,setIntersted] = useState(false)

    const [userSkills,setUserSkills] = useState([])

    //user compatibility
    const [isCompatible, setIsCompatible] = useState(false)

    useEffect(()=>{

        //get user's id
        const getUserId = () => {
            AsyncStorage.getItem('user').then((user)=> setUserId(JSON.parse(user).id))//logged in user id
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

            //check user compatibility with job after fetching job details
            checkCompatibility(Response.data)
        })

        

    },[])

    //function to check the users compatibility with the job
    const checkCompatibility = (jobDetails) => {
        //get user ID
        AsyncStorage.getItem('user').then(obj => {

            //fetch the users skills
            axios({
                method:'GET',
                url:'http://'+localhost+':8000/api/activities/'+JSON.parse(obj).id
            }).then((res) => {
                //update state of user skills
                res.data.skills.forEach(skill => {
                    setUserSkills(userSkills.push(skill.skill))
                });
                //see the job keywords if they match with user's skills
                findKeyword(jobDetails)
            })
        
        })
    }

    //function to match the skills and job details keyword
    const findKeyword = (jobDetails) => {
        
        //the following is an algorithm the check the job keywords

        //check job description keywords
        let description = jobDetails.offer.description.toLowerCase()
        userSkills.forEach(skill => {
            //if skill is mentioned in description -> set user is interested
            if(description.includes(skill.toLowerCase())) {
                setIsCompatible(true)
                return
            }
        })

        //check job requirements keywords
        jobDetails.requirements.forEach(req => {
            userSkills.forEach(skill => {
                if(req.requirement.toLowerCase().includes(skill.toLowerCase())) {
                    setIsCompatible(true)
                    return
                }
            })
        })
    }


    return (

        !details?
        <View style={globalStyles.loadingContainer}>
        <ActivityIndicator
            size={55}
            color='#00a6ff'/> 
        </View>
        :
        
        <View style={{flex:1}}>

            <ScreenHeader text={details.offer.position+' Job Position'}/>

            <ScrollView style={{backgroundColor:'white'}}>
            <View style={globalStyles.container}>

                {/* Job Details Header */}
                <View style={styles.header}>

                    {
                        details.user.picture_base64?
                        <Image source={{uri:'data:image/png;base64,'+details.user.picture_base64}} style={styles.picture}/>:
                        <Image source={require('../../assets/profile/default_picture.jpg')} style={styles.picture}/>
                    }
                    <Text style={styles.name}>{details.user['name']}</Text>

                </View>

                {
                    (isCompatible && details.user.id != userId)?
                    <View style={styles.suitableContainer}>
                        <Text style={styles.suitableText}>This job might be suitable for you</Text>
                    </View>
                    :
                    <></>
                }

                {/* postion */}
                <View style={styles.section}>

                    <Text style={styles.title}>Position</Text>
                    <Text style={styles.textDetails}>{details.offer['position']}</Text>

                </View>

                {/* location */}
                <View style={styles.section}>

                    <Text style={styles.title}>City</Text>
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

                {
                    //checking if job salary exists
                    details.offer['salary']?
                    <View style={styles.section}>
                        <Text style={styles.title}>Salary</Text>
                        <Text style={styles.textDetails}>{details.offer.salary} $/{details.offer.salary_period}</Text>
                    </View>:<></>

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

                <View style={styles.section}>
                    <Text style={styles.title}>Location</Text>

                    <MapView
                        initialRegion={{
                            latitude: Number(details.user.lat),
                            longitude: Number(details.user.lng),
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        style={styles.map}
                    >
                    <Marker
                            key={userId}
                            coordinate={{ 
                                latitude: Number(details.user.lat),
                                longitude: Number(details.user.lng)
                            }}
                        />
                    </MapView>
                </View>
                
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
        </View>
     );
}
 
export default JobDetails;

const styles = StyleSheet.create({
    header:{
        alignItems:'center'
    },
    picture:{
        width:200,
        height:200,
        borderRadius:Dimensions.get('window').width,
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
        color:'#205a8a'
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
    map:{
        width:'100%'
        ,height:300,
        margin:20,
        alignSelf:'center',
    },
    suitableContainer:{
        alignSelf:'center',
        width:'90%',
        backgroundColor:'#d9edff',
        borderRadius:20,
        paddingVertical:10
    },
    suitableText:{
        textAlign:'center',
        fontSize:15,
        fontWeight:'bold',
        color:'#0462b5'
    }
})