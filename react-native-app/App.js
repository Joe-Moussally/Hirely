import { NavigationContainer } from '@react-navigation/native';
import NewUserStack from "./navigations/newUserStack";
import MainAppNavigation from './navigations/MainAppNavigation';

export default function App() {
  return (
    <NavigationContainer>
      {/* <NewUserStack /> */}
      <MainAppNavigation />
    </NavigationContainer>
    
  );
}