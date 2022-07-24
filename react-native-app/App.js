import { NavigationContainer } from '@react-navigation/native';
import GuestStack from "./navigations/GuestStack";
import MainAppNavigation from './navigations/MainAppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { localhost } from "./globalVariables";
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {

  
  //fetch token on app execution to check if user is logged in
  const [token,setToken] = useState('')

  //validate if token has expired
  useEffect(()=>{
    AsyncStorage.getItem('token').then((value)=>{
      setToken(value)

      //get user's data
      axios({
        method:'POST',
        url:'http://'+localhost+':8000/api/profile',
        headers:{
          'Authorization':'Bearer '+value
        }
      }).then(async (Response) => {
  
        await AsyncStorage.removeItem('user')
        await AsyncStorage.setItem('user',JSON.stringify(Response.data))
  
      }).catch((err)=>{
        //token expired or not found
        console.warn(err)
        setToken('')
      })
    })
  },[])

  return (
    
    <NavigationContainer>

      {!token?
      <GuestStack setTokenApp={setToken}/>
      :<MenuProvider>
        <MainAppNavigation setTokenApp={setToken}/>
      </MenuProvider>
      }
      
    </NavigationContainer>
    
  );
}