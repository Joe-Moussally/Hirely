import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from '../screens/new-user-screens/splash';
import SignUp from '../screens/new-user-screens/signup';
import LogIn from '../screens/new-user-screens/signup';


//screen functions to use in stack
function SplashScreen() {
    return (<Splash />);
}

function SignUpScreen() {
    return (<SignUp />);
}

function LogInScreen() {
    return (<LogIn />);
}


//creating the stack navigator
const Stack = createNativeStackNavigator();

export default function NewUserStack() {
    return(
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="LogIn" component={LogInScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}