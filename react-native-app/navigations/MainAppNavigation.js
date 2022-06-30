import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import MainHeader from '../shared/MainHeader'
import Chats from '../screens/main-screens/Chats'
import Jobs from '../screens/main-screens/Jobs'
import MyJobs from '../screens/main-screens/MyJobs'
import Profile from  '../screens/main-screens/Profile'
import { StyleSheet } from 'react-native';


export default function MainAppNavigation() {

    //creating the bottom navigation tab
    const Tab = createBottomTabNavigator()

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
            options={{tabBarIcon:({color,size})=>(<Entypo name="magnifying-glass" size={size} color={color}/>)}}/>

            <Tab.Screen
            name="My Jobs"
            component={MyJobs}
            options={{tabBarIcon:({size, color})=>(<FontAwesome5 name="suitcase" size={size} color={color} />)}}/>

            <Tab.Screen
            name="Chats"
            component={Chats}
            options={{tabBarIcon:({size, color})=>(<Ionicons name="ios-chatbubble-ellipses" size={size} color={color} />)}}/>
            
            <Tab.Screen
            name="Profile"
            component={Profile}
            options={{tabBarIcon:({size, color})=>(<Ionicons name="person-sharp" size={size} color={color} />)}}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    // tabBar:{
    //     borderRadius:10,
    //     width:'90%',
    //     position:'absolute',
    //     marginHorizontal:'5%',
    //     marginBottom:12,
    // }
})