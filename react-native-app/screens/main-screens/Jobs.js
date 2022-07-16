import { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, ActivityIndicator, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { localhost } from "../../globalVariables";
import { globalStyles } from "../../styles/global";
import JobCard from "../../components/JobCard";
import Search from "../../components/Search";


export default function Jobs() {

    const [jobs,setJobs] = useState([])
    const [filteredJobs,setFilteredJobs] = useState([])

    //track the search value
    const [value,setValue] = useState('')

    //track when the data is loaded or not
    const [isLoading,setIsLoading] = useState(true)

    useLayoutEffect(()=>{

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
                    setFilteredJobs(Response.data['offers'])
                    setIsLoading(false)
                }).catch(err => {
                    console.log('JOBS.JS',err.response.status)
                })
            })
        }
        getOffers()
    


    },[])

    //useEffect for search input changes
    useEffect(()=>{
        //filter data according to search
        let filteredArray = []
        let lowerCaseSearch = value.toLocaleLowerCase()

        if(value === '') {
            setFilteredJobs(jobs)
        }

        jobs.filter(job => {
            let jobPositionLowercase = job.position.toLocaleLowerCase()
            if(jobPositionLowercase.includes(lowerCaseSearch)) {
                filteredArray.push(job)
                setFilteredJobs(filteredArray)
            }
        })
    },[value])

    return (


        <View style={{flex:1,backgroundColor:'white'}}>
            
            <Search setValue={setValue} setFilteredJobs={setFilteredJobs}/>

            {
                isLoading?
                <View style={globalStyles.loadingContainer}>
                <ActivityIndicator
                    size={55}
                    color='#00a6ff'/> 
                </View>
                :
                <FlatList
                data={filteredJobs}
                renderItem={({item}) => <JobCard job={item}/>}
                keyExtractor={item => item.id}
                style={{backgroundColor:'white',marginBottom:60}}/>
            }


        </View>

    )
}