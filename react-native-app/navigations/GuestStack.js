import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from '../screens/new-user-screens/splash';
import SignUp from '../screens/new-user-screens/signup';
import LogIn from '../screens/new-user-screens/login';
import Header from '../shared/header';
import EditProfileActivities from '../screens/new-user-screens/profile-activities-screens/EditProfileActivities';


//creating the stack navigator
const Stack = createNativeStackNavigator();

export default function GuestStack({ setTokenApp }) {

    //defining guestStack Screens
    const LogInScreen = () => (
        <LogIn setToken={setTokenApp}/>
    )


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
                <Stack.Screen name="LogIn" component={LogInScreen} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Activities" component={EditProfileActivities} />

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