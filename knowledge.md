# SaveRush - Quick Commerce App

## Project Overview
SaveRush is a quick commerce app built with React Native CLI. The app allows users to:
- Login with phone number and OTP
- Set their delivery location
- Browse and order products for quick delivery

## Project Structure
- `/src/screens` - Main screens of the application
- `/src/components` - Reusable UI components organized by screen
- `/src/assets` - Images, fonts, and other static assets
- `/utils` - Utility functions and constants

## Key Features
- Phone authentication flow
- Location selection with map integration
- Product browsing and ordering

## Location Screen
The Location screen allows users to:
1. Search for a delivery address
2. Use their current location
3. Select from saved locations
4. View the selected location on a map
5. Continue to the home screen with the selected location

## Development Notes
- The app uses React Navigation for screen navigation
- AsyncStorage is used for local data persistence
- Geolocation is implemented for current location detection
- Google Maps integration for location visualization

## Style Guidelines
- Primary color: #542BC9 (Purple)
- Accent color: #A4EC59 (Green)
- Font family: Poppins
- Rounded corners for UI elements (12px radius)
- Linear gradients for headers and backgrounds

## Dependencies
- react-navigation
- react-native-maps
- react-native-geolocation-service
- react-native-linear-gradient
- @react-native-async-storage/async-storage
