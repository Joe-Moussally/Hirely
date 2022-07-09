import React, { useState,useEffect } from "react";
import { Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Linking, Alert } from "react-native";
import * as Location from 'expo-location';
import { globalStyles } from "../../styles/global";
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { localhost } from "../../globalVariables";


export default function SignUp() {

    //initiazling the variables needed for signup
    const [fullName,setFullName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    //track user's location on succesful signup
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const navigation = useNavigation();

    const handleSignUp = async () =>{

        if(!location) return

        let data = new FormData()
        data.append("name",fullName)
        data.append("email",email)
        data.append("password",password)
        data.append('lat',location.coords.latitude)
        data.append('lng',location.coords.longitude)

        await axios({

            method:'post',
            url:'http://'+localhost+':8000/api/register',
            data:data,
            headers: { 'Content-Type':'multipart/form-data;' },

        }).then((Response)=>{

            console.log(Response.data)
            navigation.navigate('LogIn')

        }).catch((Error) => {

            console.log(Error)

        })
    }

    //function to get user's location
    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          Alert.alert('Permission','Enable location permission for sign up',[{
            text:'Go to settings',
            onPress:()=>Linking.openSettings()
            },
            {text:'Close',
            onPress:()=>{return}}])
          
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log('LOCATIONNNNNNNNN',location.coords.latitude)
    }

    useEffect(()=>{getLocation()},[])

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={globalStyles.container}>
            <Text style={globalStyles.blueTitle}>Sign Up</Text>

            {/* Full Name Input */}
            <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.inputLabel}>Full Name</Text>
                <TextInput
                style={globalStyles.input}
                placeholder="John Doe"
                onChangeText={name=> setFullName(name)}/>
            </View>

            {/* Email Input */}
            <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.inputLabel}>Email</Text>
                <TextInput
                style={globalStyles.input}
                placeholder="example@mail.com"
                onChangeText={email=> setEmail(email)}/>
            </View>

            {/* Password Input */}
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
            onPress={handleSignUp}>
                <LinearGradient
            colors={['#006eff','#00d3eb']}
            style={{borderRadius:10}}
            start={[0, 1]} end={[1, 0]}>
                <Text style={globalStyles.fullWidthButtonText}>Sign Up</Text>
                </LinearGradient>
            </TouchableOpacity>
            

        </View>
        </TouchableWithoutFeedback>
    )
}