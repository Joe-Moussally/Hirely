import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from '../screens/new-user-screens/splash';
import SignUp from '../screens/new-user-screens/signup';
import LogIn from '../screens/new-user-screens/login';
import Header from '../shared/header';


// //screen functions to use in stack
// function SplashScreen() {
//     return (<Splash />);
// }

// function SignUpScreen() {
//     return (<SignUp />);
// }

// function LogInScreen() {
//     return (<LogIn />);
// }


//creating the stack navigator
const Stack = createNativeStackNavigator();

export default function NewUserStack() {
    return(

            <Stack.Navigator
            screenOptions={{
                headerTitle: ()=><Header />,
                // headerBackVisible:true,
                headerTintColor:'white',
                headerStyle:{
                    backgroundColor:'#00a6ff',
                }}}>

                <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>
                <Stack.Screen name="LogIn" component={LogIn} />
                <Stack.Screen name="SignUp" component={SignUp} />

            </Stack.Navigator>

    )
}

const styles = StyleSheet.create({
    headerImage:{
        resizeMode:'contain',
        width:'100%',
        height:40,
        backgroundColor:'red'
    }
})

{/* <Image 
            source={require('../assets/app-logos/white-brand.png')}
            style={styles.headerImage}/> */}