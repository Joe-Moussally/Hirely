import { NavigationContainer } from '@react-navigation/native';
import GuestStack from "./navigations/GuestStack";
import MainAppNavigation from './navigations/MainAppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function App() {

  //fetch token on app execution to check if user is logged in
  const [token,setToken] = useState('')
  
  useEffect(()=>{

    AsyncStorage.getItem('token').then((value)=>{
      setToken(value)
    })
  },[])

  return (
    
    <NavigationContainer>
      {token?
      <MainAppNavigation />
      :<GuestStack />}
      
    </NavigationContainer>
    
  );
}