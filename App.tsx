import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/screens/Splash';
import LoginScreen from './src/screens/Login';
import OtpScreen from './src/screens/Otp';
import Home from './src/screens/Home';
import LocationScreen from './src/screens/Location';
import SearchAddress from './src/screens/SearchAddress';
import AddressDetails from './src/screens/AddressDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="SearchAddress" component={SearchAddress} />
        <Stack.Screen name="AddressDetails" component={AddressDetails} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
