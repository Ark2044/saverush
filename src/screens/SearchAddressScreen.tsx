import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackParams';
import {RouteProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Assume we would use a real map component in a production app
const MapPlaceholder = () => (
  <View style={styles.mapPlaceholder}>
    <Text style={styles.mapPlaceholderText}>Map View</Text>
    <Icon name="locate" size={32} color="#E91E63" style={styles.mapPin} />
  </View>
);

type SearchAddressScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SearchAddress'
>;

type SearchAddressScreenRouteProp = RouteProp<
  RootStackParamList,
  'SearchAddress'
>;

type Props = {
  navigation: SearchAddressScreenNavigationProp;
  route: SearchAddressScreenRouteProp;
};

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const SearchAddress: React.FC<Props> = ({navigation, route}) => {
  const {currentRegion} = route.params;
  const [selectedLocation, setSelectedLocation] = useState<string>(
    'Grand Hyatt Mumbai Hotel & Residences',
  );

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleContinue = useCallback(() => {
    navigation.navigate('AddressDetails', {
      selectedLocation: selectedLocation,
      coordinates: {
        latitude: currentRegion.latitude,
        longitude: currentRegion.longitude,
      },
    });
  }, [navigation, selectedLocation, currentRegion]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.mapContainer}>
        <MapPlaceholder />

        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.locationInfoContainer}>
        <View style={styles.locationDetailsCard}>
          <Icon
            name="location-outline"
            size={24}
            color="#333"
            style={styles.locationIcon}
          />
          <Text style={styles.locationText}>{selectedLocation}</Text>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleContinue}>
          <Text style={styles.confirmButtonText}>Confirm & Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    color: '#999',
    fontSize: 18,
  },
  mapPin: {
    position: 'absolute',
    marginTop: -20,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationInfoContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationDetailsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  locationIcon: {
    marginRight: 12,
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#9ee659',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SearchAddress;
