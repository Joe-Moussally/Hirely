import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { globalStyles } from '../../styles/global'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { localhost } from "../../globalVariables";
import JobCard from "../../components/JobCard";
import { useRoute } from "@react-navigation/native";
import Search from "../../components/Search";
import EmptyScreenText from "../../components/EmptyScreenText";


export default function MyJobs({navigation}) {

    const route = useRoute()

    const [jobs,setJobs] = useState([])
    const [filteredJobs,setFilteredJobs] = useState([])

    //track the search value
    const [value,setValue] = useState('')

    //track when the data is loaded or not
    const [isLoading,setIsLoading] = useState(true)

    // for filtering
    const [minValue,setMinValue] = useState(0)
    const [maxValue,setMaxValue] = useState(Infinity)

    useEffect(()=>{

        //get the user's job offers
        AsyncStorage.getItem('token').then((token) => {
            //fetch offers once token is ready
            axios({
                headers:{'Authorization':'Bearer '+token},
                method:'GET',
                url:'http://'+localhost+':8000/api/offers/user'
            }).then(Response => {
                setJobs(Response.data['offers'])
                setFilteredJobs(Response.data['offers'])
                setIsLoading(false)
            }).catch((err)=>{
                console.log("MYJOBS ERROR")
            })
        })
    },[route.params])

    //useEffect for search input changes
    useEffect(()=>{
        //filter data according to search
        let filteredArray = []
        let lowerCaseSearch = value.toLocaleLowerCase()

        if(value === '') {
            setFilteredJobs(jobs)
        }

        if (minValue == 0 && maxValue == Infinity) {
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
        })
    },[value,minValue,maxValue])

    return (        
        <View style={styles.container}>

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
                <EmptyScreenText text="You don't have any jobs posted"/>
                :
                <FlatList
                data={filteredJobs}
                renderItem={({item}) => <JobCard job={item}/>}
                keyExtractor={item => item.id}
                style={{backgroundColor:'white',width:'100%',height:'100%',marginBottom:60}}/>
            }

            {/* Add Job Offer Button */}
            <TouchableOpacity
            style={styles.add}
            onPress={()=>navigation.push('AddJobStack')}>
            <MaterialIcons name="add" size={30} color="white" style={styles.plus}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1
    },
    add:{
        backgroundColor:'#00a6ff',
        width:60,
        height:60,
        borderRadius:30,
        position:'absolute',
        left:'80%',
        top:'100%',
        transform:[{translateY:-140}]
    },
    plus:{
        alignSelf:'center',
        marginTop:15
    },
    //modal
    modalHeader:{
        display:'flex',
        flexDirection:'row'
    }
})