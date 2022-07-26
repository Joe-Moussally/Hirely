import { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, ActivityIndicator, View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { localhost } from "../../globalVariables";
import { globalStyles } from "../../styles/global";
import JobCard from "../../components/JobCard";
import Search from "../../components/Search";
import EmptyScreenText from "../../components/EmptyScreenText";


export default function Jobs() {

    const [log,setLog] = useState('')

    const [jobs,setJobs] = useState([])
    const [filteredJobs,setFilteredJobs] = useState([])

    //track the search value
    const [value,setValue] = useState('')

    //track when the data is loaded or not
    const [isLoading,setIsLoading] = useState(true)

    // for filtering
    const [minValue,setMinValue] = useState(0)
    const [maxValue,setMaxValue] = useState(Infinity)

    useLayoutEffect(()=>{
        
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

        if (minValue == 0 && maxValue == Infinity) {
            setLog('HERE')
           jobs.filter(job => {
            let jobPositionLowercase = job.position.toLocaleLowerCase()
            if (jobPositionLowercase.includes(lowerCaseSearch)) {
                filteredArray.push(job)
                setFilteredJobs(filteredArray)
            }
           }) 
           return
        }

        jobs.filter(job => {
            //calcutate the job rate for filtering per day to compare all salarie with different salary periods
            let jobRate
            if(job.salary_period == 'hour') {
                jobRate = job.salary*24
            } else if (job.salary_period == 'month') {
                jobRate = job.salary/30
            } else {
                jobRate = job.salary/365
            }

            let jobPositionLowercase = job.position.toLocaleLowerCase()
            if (jobPositionLowercase.includes(lowerCaseSearch) && jobRate > minValue && jobRate < maxValue) {
                filteredArray.push(job)
                setFilteredJobs(filteredArray)
            }
            // } else {
            //     if(jobPositionLowercase.includes(lowerCaseSearch) && jobRate > minValue && jobRate < maxValue) {
            //         filteredArray.push(job)
            //         setFilteredJobs(filteredArray)
            //     }        
            // }
        })
    },[value,minValue,maxValue])

    return (


        <View style={{flex:1,backgroundColor:'white'}}>

            <Text>{log}</Text>
            
            <Search setValue={setValue} setFilteredJobs={setFilteredJobs} setMinValue={setMinValue} setMaxValue={setMaxValue}/>

            {
                isLoading?
                <View style={globalStyles.loadingContainer}>
                <ActivityIndicator
                    size={55}
                    color='#00a6ff'/> 
                </View>
                :
                jobs.length == 0?
                <EmptyScreenText text="There are no jobs posted recently"/>:
                <FlatList
                data={filteredJobs}
                renderItem={({item}) => <JobCard job={item}/>}
                keyExtractor={item => item.id}
                style={{backgroundColor:'white',marginBottom:60}}/>
            }


        </View>

    )
}