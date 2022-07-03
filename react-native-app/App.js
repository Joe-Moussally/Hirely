import { NavigationContainer } from '@react-navigation/native';
import GuestStack from "./navigations/GuestStack";
import MainAppNavigation from './navigations/MainAppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { localhost } from "./globalVariables";


export default function App() {

  
  //fetch token on app execution to check if user is logged in
  const [token,setToken] = useState('')

  //validate if token has expired
  useEffect(()=>{

    const fetchToken = async () => {
      await AsyncStorage.getItem('token').then((value)=>{
        setToken(value)
      })
    }
    fetchToken()

    axios({
      method:'POST',
      url:'http://'+localhost+':8000/api/profile',
      headers:{
        'Authorization':'Bearer '+token
      }
    }).then((Response) => {
      console.log(Response.data)
    }).catch((err)=>{
      //token expired or not found
      if(err.response.status) {
        setToken('')
      }
    })

    
  },[])

  return (
    
    <NavigationContainer>
      {token?
      <MainAppNavigation />
      :<GuestStack setToken={setToken}/>}
      
    </NavigationContainer>
    
  );
}