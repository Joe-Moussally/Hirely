import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import axios from 'axios';
import { localhost } from "../../globalVariables";
import { globalStyles } from "../../styles/global";

const JobDetails = ({route}) => {
    console.log('ROUTE PARAMS',route.params.id)//offer_id

    const [details,setDetails] = useState('')


    useEffect(()=>{

        //get user's id
        const getUserId = async () => {
            await AsyncStorage.getItem('user').then((user)=> console.log(JSON.parse(user).id))//logged in user id
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
    },[])

    return (

        !details
        ?<Text>Loaing</Text>
        :
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

            {/* postion
            <View style={styles.section}>

                <Text style={styles.title}>Position</Text>
                <Text style={styles.textDetails}>{details.offer['position']}</Text>

            </View> */}

        </View>
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
        marginVertical:10
    },
    title:{
        fontWeight:'bold',
        fontSize:19
    },
    textDetails:{
        fontSize:17,
        padding:10
    }
})