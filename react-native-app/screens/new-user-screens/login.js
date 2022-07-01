import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { globalStyles } from "../../styles/global";
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { localhost } from "../../globalVariables";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

export default function LogIn() {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    //function to check email and password on Login attempt
    const handleLogIn = async () => {
        console.log(email,password)
        let data = new FormData()
        data.append("email",email)
        data.append("password",password)
        await axios({
            method:'post',
            url:'http://'+localhost+':8000/api/login',
            data:data,
            headers: { 'Content-Type':'multipart/form-data;' },
        }).then( async (Response)=>{
            await AsyncStorage.setItem('token', Response.data["access_token"])
        }).catch((Error) => {
            console.log(Error)
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

            
            <TouchableOpacity
            style={globalStyles.fullWidthButton}
            onPress={handleLogIn}>
                <LinearGradient
            colors={['#006eff','#00d3eb']}
            style={{borderRadius:10}}
            start={[0, 1]} end={[1, 0]}>
                <Text style={globalStyles.fullWidthButtonText}>Log In</Text>
                </LinearGradient>
            </TouchableOpacity>
            

        </View>
        </TouchableWithoutFeedback>
    )
}