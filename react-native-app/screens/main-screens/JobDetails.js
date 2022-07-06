import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Text } from "react-native";
import axios from 'axios';
import { localhost } from "../../globalVariables";

const JobDetails = ({route}) => {
    console.log('ROUTE PARAMS',route.params.id)//offer_id


    useEffect(()=>{
        const getUserId = async () => {
            await AsyncStorage.getItem('user').then((user)=> console.log(JSON.parse(user).id))//logged in user id
        }
        getUserId()

        //fetch offer detail and requirements
        axios({
            method:'GET',
            url:'http://'+localhost+':8000/api/offers/'+route.params.id //offer id
        }).then((Response) => {
            console.log(' JOB DETAILS',Response.data)
        }).catch((err)=>{
            console.log("ERROR JOB DETAILS")
        })
    },[])
    return ( 
        <Text>JOB DETAILS</Text>
     );
}
 
export default JobDetails;