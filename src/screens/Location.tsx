import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TopBar from '../components/location-screen/TopBar';
import LocationSearchBar from '../components/location-screen/LocationSearchBar';
import CurrentLocationButton from '../components/location-screen/CurrentLocationButton';
import SavedLocations from '../components/location-screen/SavedLocations';
import {COLORS} from '../../utils/Colors';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationGraphic from '../components/location-screen/LocationGraphic';

const LocationScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [savedLocations, setSavedLocations] = useState<string[]>([]);

  // Fetch saved locations from AsyncStorage (replace with your actual data source)
  useEffect(() => {
    const fetchSavedLocations = async () => {
      try {
        const data = await AsyncStorage.getItem('savedLocations');
        if (data) {
          setSavedLocations(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error fetching saved locations:', error);
      }
    };
    fetchSavedLocations();
  }, []);

  const handleBackPress = () => {
    // Implement your back navigation logic here
    Alert.alert('Back pressed');
  };

  const requestLocationPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app requires access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      // For iOS, permission is handled in Info.plist; assume it's granted for this example.
      return true;
    }
  };

  const handleCurrentLocationPress = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location permission is required.');
      return;
    }
    Geolocation.getCurrentPosition(
      position => {
        // For demonstration, we're simply building an address string from the coordinates.
        // In a real app, you would integrate with a reverse geocoding API.
        const {latitude, longitude} = position.coords;
        const address = `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(
          4,
        )}`;
        setSearchQuery(address);
        setSelectedLocation(address);
        Alert.alert('Current Location', address);
      },
      error => {
        console.error(error);
        Alert.alert('Error', 'An error occurred while fetching location.');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const handleSelectSavedLocation = (location: string) => {
    setSearchQuery(location);
    setSelectedLocation(location);
    Alert.alert('Saved Location Selected', location);
  };

  const handleContinue = () => {
    if (selectedLocation || searchQuery) {
      Alert.alert(
        'Location Selected',
        `Your location: ${selectedLocation || searchQuery}`,
      );
      // Navigate to the next screen in your app
    } else {
      Alert.alert('No Location', 'Please enter or select a location.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.PRIMARY_PURPLE}
      />
      <TopBar title="Delivery Address" onBackPress={handleBackPress} />
      <LinearGradient
        colors={[COLORS.PRIMARY_PURPLE, '#291563']}
        style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.mainContainer}>
            <LocationSearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <LocationGraphic />
            <CurrentLocationButton onPress={handleCurrentLocationPress} />
            <SavedLocations
              locations={savedLocations}
              onSelectLocation={handleSelectSavedLocation}
            />
            <View style={styles.continueContainer}>
              {/* Dedicated Continue button */}
              <CurrentLocationButton
                onPress={handleContinue}
                buttonText="Continue"
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_PURPLE,
  },
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
  mainContainer: {
    backgroundColor: COLORS.BACKGROUND_WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginBottom: 20,
  },
  continueContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default LocationScreen;
