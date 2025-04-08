import React, {useState, useCallback, useEffect} from 'react';
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
  TextInput,
  FlatList,
  Keyboard,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackParams';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LocationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Location'
>;

type Props = {
  navigation: LocationScreenNavigationProp;
};

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const isSmallScreen = SCREEN_HEIGHT < 700;
const isLargeScreen = SCREEN_HEIGHT > 800;

const LocationScreen: React.FC<Props> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedLocations, setSavedLocations] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    loadSavedLocations();
    loadRecentSearches();

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const loadSavedLocations = async () => {
    try {
      const saved = await AsyncStorage.getItem('savedLocations');
      if (saved) {
        setSavedLocations(JSON.parse(saved));
      } else {
        // Default mock data
        setSavedLocations(['Gateway of India', 'Bandra West,Police Station']);
      }
    } catch (error) {
      console.error('Error loading saved locations:', error);
    }
  };

  const loadRecentSearches = async () => {
    try {
      const recent = await AsyncStorage.getItem('recentSearches');
      if (recent) {
        setRecentSearches(JSON.parse(recent));
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  };

  const requestLocationPermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access',
            message: 'Allow access to find nearby stores and delivery services',
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
        'Location access is required to find nearby stores.',
      );
      return;
    }

    setIsSearching(true);
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const address = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        setIsSearching(false);
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
        setIsSearching(false);
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
        longitudeDelta: 0.0922 * (SCREEN_WIDTH / 400),
      },
    });
  }, [navigation, savedLocations]);

  const handleLocationSelect = useCallback(
    (location: string) => {
      navigation.navigate('AddressDetails', {
        selectedLocation: location,
        coordinates: {
          latitude: 28.6139,
          longitude: 77.209,
        },
      });
    },
    [navigation],
  );

  const renderLocationItem = ({item}: {item: string}) => (
    <TouchableOpacity
      style={styles.locationItem}
      onPress={() => handleLocationSelect(item)}>
      <Icon name="location-outline" size={24} color="#333" />
      <Text style={styles.locationText}>{item}</Text>
      <Icon
        name="chevron-forward-outline"
        size={20}
        color="#333"
        style={styles.chevronIcon}
      />
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#542BC9', '#291563']} style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
      />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.topBar}>
            <TouchableOpacity onPress={handleBackPress}>
              <Icon name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Where are you?</Text>
            <Text style={styles.subtitleText}>
              Select your location to find nearby stores
            </Text>

            <TouchableOpacity
              onPress={handleSearchPress}
              style={styles.searchContainer}>
              <Icon
                name="search-outline"
                size={20}
                color="#999"
                style={styles.searchIcon}
              />
              <Text style={styles.searchInput}>
                Enter your delivery address
              </Text>
            </TouchableOpacity>

            <View style={styles.orDivider}>
              <View style={styles.dividerLine} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              style={styles.currentLocationButton}
              onPress={getCurrentLocation}>
              <Icon name="locate-outline" size={20} color="#fff" />
              <Text style={styles.currentLocationButtonText}>
                Use Current Location
              </Text>
            </TouchableOpacity>

            {isSearching && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6A5ACD" />
              </View>
            )}

            {!keyboardVisible && (
              <>
                {savedLocations.length > 0 && (
                  <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Saved Addresses</Text>
                    <View style={styles.savedLocationsContainer}>
                      {savedLocations.map((location, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.locationItem}
                          onPress={() => handleLocationSelect(location)}>
                          <Icon
                            name="location-outline"
                            size={24}
                            color="#333"
                          />
                          <Text style={styles.locationText}>{location}</Text>
                          <Icon
                            name="chevron-forward-outline"
                            size={20}
                            color="#333"
                            style={styles.chevronIcon}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}

                {recentSearches.length > 0 && (
                  <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Recent Searches</Text>
                    <FlatList
                      data={recentSearches}
                      renderItem={renderLocationItem}
                      keyExtractor={(item, index) => `recent-${index}`}
                      scrollEnabled={false}
                    />
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
              </>
            )}
          </View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    minHeight: SCREEN_HEIGHT,
  },
  topBar: {
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingTop: isSmallScreen ? 30 : 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: SCREEN_WIDTH * 0.06,
    paddingTop: isSmallScreen ? 20 : 30,
    paddingBottom: 20,
  },
  titleText: {
    fontSize: isSmallScreen ? 24 : 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: isSmallScreen ? 8 : 10,
  },
  subtitleText: {
    fontSize: isSmallScreen ? 14 : 16,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: isSmallScreen ? 20 : 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: isSmallScreen ? 45 : 55,
    marginBottom: isSmallScreen ? 15 : 20,
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
    color: '#333',
    fontSize: isSmallScreen ? 14 : 16,
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: isSmallScreen ? 15 : 20,
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
    fontSize: isSmallScreen ? 14 : 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  currentLocationButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: isSmallScreen ? 12 : 15,
    borderRadius: 12,
    marginBottom: isSmallScreen ? 15 : 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentLocationButtonText: {
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: isSmallScreen ? 14 : 16,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  sectionContainer: {
    marginBottom: isSmallScreen ? 15 : 20,
  },
  sectionTitle: {
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: isSmallScreen ? 8 : 10,
  },
  savedLocationsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: isSmallScreen ? 12 : 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  locationText: {
    color: '#333',
    marginLeft: 10,
    fontSize: isSmallScreen ? 14 : 16,
    flex: 1,
  },
  chevronIcon: {
    marginLeft: 8,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minHeight: isSmallScreen ? 200 : 300,
  },
  lottieStyle: {
    width: isSmallScreen ? 250 : 300,
    height: isSmallScreen ? 250 : 300,
  },
});

export default LocationScreen;
