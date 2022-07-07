import { BottomTabView, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import MainHeader from '../shared/MainHeader'
import Chats from '../screens/main-screens/Chats'
import Jobs from '../screens/main-screens/Jobs'
import MyJobs from '../screens/main-screens/MyJobs'
import Profile from  '../screens/main-screens/Profile'
import { StyleSheet } from 'react-native';
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { localhost } from '../globalVariables';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddJob from '../screens/main-screens/AddJob';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import JobDetails from '../screens/main-screens/JobDetails';


export default function MainAppNavigation({ setTokenApp }) {

    //store user's token
    const [token,setToken] = useState('')

    //creating the bottom navigation tab
    const Tab = createBottomTabNavigator()
    const Stack = createNativeStackNavigator()

    //get user's detail and photo on load
    useEffect(()=>{

        //get user's token
        const getToken = async () => {
            await AsyncStorage.getItem('token').then((val)=> {
                setToken(val)
            })
        }
        getToken()
        console.log('MAIN APP NAV',token)

        axios({
            method:'POST',
            headers:{
                'Authorization':'Bearer '+token
            },
            url:'http://'+localhost+':8000/api/profile'
        }).then((Response)=>{
            console.log('MAIN NAV',Response.data)
        }).catch((err)=>{
            console.log(err)
        })
        }
    ,[])

    //Adding stack for My Jobs (user's posted Jobs) and Add Jobs Screen
    function MyJobsStack({navigation, route}) {

        //hiding header for pushed screens
        const routeName = getFocusedRouteNameFromRoute(route);
        useLayoutEffect(()=>{
            if (routeName === "AddJobStack" || routeName === "MyJobDetailsStack"){
                navigation.setOptions({tabBarStyle: styles.hiddenTabBar});
            }else {
                navigation.setOptions({tabBarStyle: styles.tabBar});
            }
        },[navigation,route])


        return(
            <Stack.Navigator>

                <Stack.Screen
                name='MyJobsStack'
                component={MyJobs}
                options={{headerShown: false}}/>

                <Stack.Screen
                name='AddJobStack'
                component={AddJob}
                options={{headerTitle:'Add Job Offer'}}
                />

                <Stack.Screen
                name='MyJobDetailsStack'
                component={JobDetails}
                options={{headerTitle:'My Job Details'}}
                />

            </Stack.Navigator>
        )
    }

    //Adding stack navigation for Jobs Screen
    function JobsStack({navigation, route}) {

        //hiding header for pushed screens
        const routeName = getFocusedRouteNameFromRoute(route);
        useLayoutEffect(()=>{
            if (routeName === "JobDetailsStack"){
                navigation.setOptions({tabBarStyle: styles.hiddenTabBar});
            }else {
                navigation.setOptions({tabBarStyle: styles.tabBar});
            }
        },[navigation,route])

        return(
            <Stack.Navigator>

                <Stack.Screen
                name='JobsStack'
                component={Jobs}
                options={{headerShown: false}}/>

                <Stack.Screen
                name='JobDetailsStack'
                options={{headerTitle:'Job Details'}}
                component={JobDetails}
                />

            </Stack.Navigator>
        )
    }

    //passing props to screens
    const ProfileScreen = () => {
        return <Profile setTokenApp={setTokenApp}/>
    }

    return(
        <Tab.Navigator
        screenOptions={{
        headerTitle: ()=><MainHeader />,
        // headerBackVisible:true,
        headerTintColor:'white',
        headerStyle:{
            backgroundColor:'#00a6ff',
        },
        tabBarStyle:styles.tabBar,
        tabBarActiveTintColor:'#00a2ff'
        }}>
            <Tab.Screen
            name="Jobs"
            component={JobsStack}
            options={{tabBarIcon:({color})=>(<Entypo name="magnifying-glass" size={30} color={color}/>)}} />

            <Tab.Screen
            name="My Jobs"
            component={MyJobsStack}
            options={{tabBarIcon:({color})=>(<FontAwesome5 name="suitcase" size={30} color={color} />)}} />

            <Tab.Screen
            name="Chats"
            component={Chats}
            options={{tabBarIcon:({color})=>(<Ionicons name="ios-chatbubble-ellipses" size={30} color={color} />)}}/>
            
            <Tab.Screen
            name="Profile"
            component={ProfileScreen}
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
    },
    hiddenTabBar:{
        display:'none'
    }
})