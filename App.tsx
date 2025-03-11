import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/screens/Splash';
import LoginScreen from './src/screens/LoginScreen';
import OtpScreen from './src/screens/OtpScreen';
import HomeScreen from './src/screens/HomeScreen';
import LocationScreen from './src/screens/LocationScreen';
import SearchAddress from './src/screens/SearchAddressScreen';
import AddressDetails from './src/screens/AddressDetailsScreen';
import UserScreen from './src/screens/UserScreen';
import CouponScreen from './src/screens/CouponScreen';
import {RootStackParamList} from './navigation/RootStackParams';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="CouponScreen" component={CouponScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
