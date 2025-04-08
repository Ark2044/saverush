import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppProvider} from './src/context/AppProvider';
import Splash from './src/screens/Splash';
import LoginScreen from './src/screens/LoginScreen';
import OtpScreen from './src/screens/OtpScreen';
import LocationScreen from './src/screens/LocationScreen';
import SearchAddressScreen from './src/screens/SearchAddressScreen';
import AddressDetailsScreen from './src/screens/AddressDetailsScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import OrderTrackingScreen from './src/screens/OrderTrackingScreen';
import UserScreen from './src/screens/UserScreen';
import SubView from './src/screens/SubViewScreen';
import {RootStackParamList} from './navigation/RootStackParams';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Otp" component={OtpScreen} />
          <Stack.Screen name="Location" component={LocationScreen} />
          <Stack.Screen name="SearchAddress" component={SearchAddressScreen} />
          <Stack.Screen
            name="AddressDetails"
            component={AddressDetailsScreen}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
          />
          <Stack.Screen name="SubView" component={SubView} />
          <Stack.Screen name="ShoppingCart" component={CartScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
          <Stack.Screen name="User" component={UserScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
