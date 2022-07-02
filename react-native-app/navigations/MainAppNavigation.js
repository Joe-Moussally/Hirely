import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import MainHeader from '../shared/MainHeader'
import Chats from '../screens/main-screens/Chats'
import Jobs from '../screens/main-screens/Jobs'
import MyJobs from '../screens/main-screens/MyJobs'
import Profile from  '../screens/main-screens/Profile'
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { localhost } from '../globalVariables';


export default function MainAppNavigation() {

    const [user,setUser] = useState('')
    const [token,setToken] = useState(async()=>await AsyncStorage.getItem('token').then((val)=> setToken(val)))

    //creating the bottom navigation tab
    const Tab = createBottomTabNavigator()

    //get user's detail and photo on load
    useEffect(()=>{
        console.log('here',token)

        axios({
            method:'POST',
            headers:{
                'Authorization':'Bearer '+token
            },
            url:'http://'+localhost+':8000/api/profile'
        }).then((Response)=>{
            console.log('HERE',Response.data)
        }).catch((err)=>{
            console.log(err)
        })
        }
    ,[])

    return(
        <Tab.Navigator
        screenOptions={{
        headerTitle: ()=><MainHeader />,
        // headerBackVisible:true,
        headerTintColor:'white',
        headerStyle:{
            backgroundColor:'#00a6ff',
        },
        tabBarStyle:styles.tabBar
        }}>
            <Tab.Screen
            name="Jobs"
            component={Jobs}
            options={{tabBarIcon:({color})=>(<Entypo name="magnifying-glass" size={30} color={color}/>)}}/>

            <Tab.Screen
            name="My Jobs"
            component={MyJobs}
            options={{tabBarIcon:({color})=>(<FontAwesome5 name="suitcase" size={30} color={color} />)}}/>

            <Tab.Screen
            name="Chats"
            component={Chats}
            options={{tabBarIcon:({color})=>(<Ionicons name="ios-chatbubble-ellipses" size={30} color={color} />)}}/>
            
            <Tab.Screen
            name="Profile"
            component={Profile}
            options={{tabBarIcon:({color})=>(<Ionicons name="person-sharp" size={30} color={color} />)}}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBar:{
        borderRadius:10,
        width:'95%',
        height:60,
        position:'absolute',
        marginHorizontal:'2.5%',
        marginBottom:12,
    }
})