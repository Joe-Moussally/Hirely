import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/new-user-screens/splash';

//screen functions to use in stack
function SplashScreen() {
    return (<Splash />);
}

//creating the stack navigator
const Stack = createNativeStackNavigator();

export default function NewUserStack() {
    return(
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}