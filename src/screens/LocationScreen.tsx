import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  Platform,
  PermissionsAndroid,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackParams';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

type LocationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Location'
>;

type Props = {
  navigation: LocationScreenNavigationProp;
};

const LocationScreen: React.FC<Props> = ({navigation}) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [savedLocations, _setSavedLocations] = useState<string[]>([]);

  const requestLocationPermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access',
            message:
              'Allow access to find nearby restaurants and delivery services',
            buttonNeutral: 'Ask Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'Enable',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  }, []);

  const getCurrentLocation = useCallback(async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Location access is required to find nearby restaurants.',
      );
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        const address = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        setSelectedLocation(address);

        navigation.navigate('AddressDetails', {
          selectedLocation: address,
          coordinates: {
            latitude,
            longitude,
          },
        });
      },
      error => {
        console.error(error);
        Alert.alert(
          'Location Error',
          'Could not retrieve location. Please try again.',
          [{text: 'OK'}],
        );
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [navigation, requestLocationPermission]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSearchPress = useCallback(() => {
    navigation.navigate('SearchAddress', {
      savedLocations,
      currentRegion: {
        latitude: 28.6139,
        longitude: 77.209,
        latitudeDelta: 0.0922,
        longitudeDelta:
          0.0922 *
          (Dimensions.get('window').width / Dimensions.get('window').height),
      },
    });
  }, [navigation, savedLocations]);

  return (
    <LinearGradient colors={['#542BC9', '#291563']} style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={handleBackPress}>
            <Icon name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Where are you?</Text>
          <Text style={styles.subtitleText}>
            Select your location to order delicious food
          </Text>

          <TouchableOpacity
            onPress={handleSearchPress}
            style={styles.searchContainer}>
            <Icon
              name="search"
              size={20}
              color="#6A5ACD"
              style={styles.searchIcon}
            />
            <Text style={styles.searchInput}>Enter your delivery address</Text>
          </TouchableOpacity>

          <View style={styles.orDivider}>
            <View style={styles.dividerLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.currentLocationButton}
            onPress={getCurrentLocation}>
            <Icon name="location-sharp" size={24} color="#6A5ACD" />
            <Text style={styles.currentLocationButtonText}>
              Use Current Location
            </Text>
          </TouchableOpacity>

          {selectedLocation && (
            <View style={styles.selectedLocationContainer}>
              <Icon name="location-sharp" size={20} color="#6A5ACD" />
              <Text style={styles.selectedLocationText}>
                {selectedLocation}
              </Text>
            </View>
          )}

          <View style={styles.illustrationContainer}>
            <LottieView
              source={require('../assets/lottie/home-delivery.json')}
              autoPlay
              loop
              style={styles.lottieStyle}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#888',
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  orText: {
    marginHorizontal: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  currentLocationButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentLocationButtonText: {
    color: '#6A5ACD',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  selectedLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  selectedLocationText: {
    marginLeft: 10,
    color: 'white',
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  illustration: {
    width: '100%',
    maxHeight: 300,
  },
  lottieStyle: {
    width: 300,
    height: 300,
  },
});

export default LocationScreen;
