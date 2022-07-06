import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { localhost } from "../../globalVariables";
import { globalStyles } from "../../styles/global";
import JobCard from "../../components/JobCard";


export default function Jobs() {

    const [jobs,setJobs] = useState([])

    useEffect(()=>{

        let token
        const getOffers = async () => {
            //getting the user's Id
            token = await AsyncStorage.getItem('token').then((val)=>{
                axios({

                    headers: {
                        'Content-Type':'multipart/form-data;',
                        'Authorization':'Bearer '+val
                    },
                    method:'GET',
                    url:'http://'+localhost+':8000/api/offers/',
        
                }).then(Response => {
                    console.log('jobs.js',Response.data['offers'])
                    setJobs(Response.data['offers'])
                }).catch(err => {
                    console.log('JOBS.JS',err.response.status)
                })
            })
        }
        getOffers()
    


    },[])

    return (
            <FlatList
            data={jobs}
            renderItem={({item}) => <JobCard job={item}/>}
            keyExtractor={item => item.id}
            style={{backgroundColor:'white',marginBottom:60}}/>
    )
}