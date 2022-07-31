import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { globalStyles } from "../../styles/global";
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { localhost } from "../../globalVariables";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

export default function LogIn({setToken}) {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const [errorMessage,setErrorMessage] = useState('')

    //function to display error message with timeout
    const displayError = (message) => {
        setErrorMessage(message)
        setTimeout(() => {setErrorMessage('')},4000)
    }
    
    //function to check email and password on Login attempt
    const handleLogIn = () => {

        //if empty fields, display error
        if(!email || !password) {
            displayError('All fields are required')
            return
        }

        let data = new FormData()
        data.append("email",email)
        data.append("password",password)
        axios({
            method:'post',
            url:'http://'+localhost+':8000/api/login',
            data:data,
            headers: {'Content-Type':'multipart/form-data;'},
        }).then(async (Response)=>{

            //on successful login -> increment login count
            axios({
                method:'POST',
                url:'http://'+localhost+':8000/api/stats/increment_login'
            }).then(async(res) => {
                await AsyncStorage.setItem('token', Response.data["access_token"])
                setToken(Response.data["access_token"])
                console.log('LOGIN.JS ',Response.data['access_token'])
    
                //fetch user data to store locally
                setUser(Response.data["access_token"])
            })



        }).catch((err) => {
            if (err.response.status) {
                displayError('Email/Password is incorrect')
            }
        })
    }

    //function that gives user info from token
    //used on login
    const setUser = async (token) => {
        axios({
            method:'POST',
            url:'http://'+localhost+':8000/api/profile',
            headers:{
              'Authorization':'Bearer '+token
            }
          }).then(async (Response) => {
            await AsyncStorage.removeItem('user')
            await AsyncStorage.setItem('user',JSON.stringify(Response.data))
          })
    }

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={globalStyles.container}>
            <Text style={globalStyles.blueTitle}>Log In</Text>

            <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.inputLabel}>Email</Text>
                <TextInput
                style={globalStyles.input}
                placeholder="example@mail.com"
                onChangeText={email=> setEmail(email)}/>
            </View>

            <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.inputLabel}>Password</Text>
                <TextInput
                style={globalStyles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={password=> setPassword(password)}/>
            </View>

            {
                //error message
                errorMessage?
                <View style={globalStyles.errorMessageContainer}>
                    <Text style={globalStyles.errorMessage}>{errorMessage}</Text>
                </View>:<></>
            }
            

            <TouchableOpacity
            style={[globalStyles.fullWidthButton,{backgroundColor:'#0086d9'}]}
            onPress={handleLogIn}>
                {/* <LinearGradient
            colors={['#006eff','#00d3eb']}
            style={{borderRadius:10}}
            start={[0, 1]} end={[1, 0]}> */}
                <Text style={globalStyles.fullWidthButtonText}>Log In</Text>
                {/* </LinearGradient> */}
            </TouchableOpacity>
            

        </View>
        </TouchableWithoutFeedback>
    )
}