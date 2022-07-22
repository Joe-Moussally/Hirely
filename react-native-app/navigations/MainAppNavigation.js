import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import MainHeader from '../shared/MainHeader'
import Chats from '../screens/main-screens/Chats'
import Jobs from '../screens/main-screens/Jobs'
import MyJobs from '../screens/main-screens/MyJobs'
import Profile from  '../screens/main-screens/Profile'
import { StyleSheet, Text } from 'react-native';
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { localhost } from '../globalVariables';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddJob from '../screens/main-screens/AddJob';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import JobDetails from '../screens/main-screens/JobDetails';
import ViewProfile from '../screens/main-screens/ViewProfile';
import Chat from '../components/Chat';
import EditProfile from '../screens/main-screens/EditProfile';


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
            if (routeName === "AddJobStack" || routeName === "MyJobDetailsStack" || routeName === "ViewProfileStack"){
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
                options={{headerShown:false}}
                />

                <Stack.Screen
                name='MyJobDetailsStack'
                component={JobDetails}
                options={({route}) => ({title: route.params.position+' Job Details'})}
                />

                <Stack.Screen
                name='ViewProfileStack'
                component={ViewProfile}
                options={({route}) => ({headerTitle: route.params.user.name+"'s Profile"})}
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
                options={({route}) => ({title: route.params.position+' Job Details'},{headerShown: false})}
                component={JobDetails}
                />

            </Stack.Navigator>
        )
    }

    //adding Stack navigation for chats section
    function ChatsStack({navigation, route}) {
        //hiding header for pushed screens
        const routeName = getFocusedRouteNameFromRoute(route);
        useLayoutEffect(()=>{
            if (routeName === "ChatStack"){
                navigation.setOptions({
                    tabBarStyle: styles.hiddenTabBar,
                    headerShown:false,
                });
            }else {
                navigation.setOptions({tabBarStyle: styles.tabBar, headerShown:true});
            }
        },[navigation,route])

        return(
            <Stack.Navigator>

                <Stack.Screen
                name='ChatsStack'
                component={Chats}
                options={{headerShown: false}}/>

                <Stack.Screen
                name='ChatStack'
                options={{headerShown: false}}
                component={Chat}
                />

            </Stack.Navigator>
        )
    }

    //adding Stack navigation for profile section
    function ProfileStack({navigation, route}) {
        //hiding header for pushed screens
        const routeName = getFocusedRouteNameFromRoute(route);
        useLayoutEffect(()=>{
            if (routeName === "EditStack"){
                navigation.setOptions({
                    tabBarStyle: styles.hiddenTabBar,
                });
            }else {
                navigation.setOptions({tabBarStyle: styles.tabBar, headerShown:true});
            }
        },[navigation,route])

        return(
            <Stack.Navigator>

                <Stack.Screen
                name='ProfileStack'
                component={ProfileScreen}
                options={{headerShown: false}}/>

                <Stack.Screen
                name='EditStack'
                options={{headerShown: false}}
                component={EditProfile}
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
        headerTintColor:'white',
        headerStyle:{
            backgroundColor:'#00a6ff',
        },
        tabBarStyle:styles.tabBar,
        tabBarActiveTintColor:'white',
        tabBarInactiveTintColor:'#abceff',
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
            component={ChatsStack}
            options={{tabBarIcon:({color})=>(<Ionicons name="ios-chatbubble-ellipses" size={30} color={color} />)}}/>
            
            <Tab.Screen
            name="Profile"
            component={ProfileStack}
            options={{tabBarIcon:({color})=>(<Ionicons name="person-sharp" size={30} color={color} />)}}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBar:{
        height:65,
        position:'absolute',
        paddingBottom:7,
        backgroundColor:'#00a6ff'
    },
    hiddenTabBar:{
        display:'none'
    }
})