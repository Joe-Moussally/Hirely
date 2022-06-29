import { NavigationContainer } from '@react-navigation/native';
import NewUserStack from "./navigations/newUserStack";

export default function App() {
  return (
    <NavigationContainer>
      <NewUserStack />
    </NavigationContainer>
    
  );
}