import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../utils/Colors';
import Geocoder from 'react-native-geocoding'; // Recommended for reverse geocoding

// Initialize Geocoder with your Google Maps API key
Geocoder.init('YOUR_GOOGLE_MAPS_API_KEY'); // Replace with your actual API key

interface MapLocationPickerModalProps {
  isVisible: boolean;
  initialLocation: {
    latitude: number;
    longitude: number;
  };
  onClose: () => void;
  onLocationSelect: (location: {
    latitude: number;
    longitude: number;
    address?: string;
  }) => void;
}

const MapLocationPickerModal: React.FC<MapLocationPickerModalProps> = ({
  isVisible,
  initialLocation,
  onClose,
  onLocationSelect,
}) => {
  const mapRef = useRef<MapView>(null);
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: initialLocation.latitude,
    longitude: initialLocation.longitude,
  });
  const [currentAddress, setCurrentAddress] = useState<string>('');

  // Reverse geocode the selected location
  const fetchLocationAddress = useCallback(async (lat: number, lng: number) => {
    try {
      const json = await Geocoder.from(lat, lng);
      const addressComponent = json.results[0];
      setCurrentAddress(addressComponent.formatted_address);
    } catch (error) {
      console.error('Error fetching address:', error);
      setCurrentAddress('Address not found');
    }
  }, []);

  // Handle location change
  const handleRegionChangeComplete = useCallback(
    (region: Region) => {
      setSelectedLocation({
        latitude: region.latitude,
        longitude: region.longitude,
      });
      fetchLocationAddress(region.latitude, region.longitude);
    },
    [fetchLocationAddress],
  );

  // Confirm location selection
  const handleConfirmLocation = useCallback(() => {
    onLocationSelect({
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      address: currentAddress,
    });
    onClose();
  }, [selectedLocation, currentAddress, onLocationSelect, onClose]);

  // Animate to current location
  const animateToCurrentLocation = useCallback(() => {
    mapRef.current?.animateToRegion(
      {
        latitude: initialLocation.latitude,
        longitude: initialLocation.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000,
    );
  }, [initialLocation]);

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.headerButton}>
            <Icon name="arrow-back" size={24} color={COLORS.DARK_GRAY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Location</Text>
          <TouchableOpacity
            onPress={handleConfirmLocation}
            style={styles.headerButton}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>

        {/* Map View */}
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: initialLocation.latitude,
              longitude: initialLocation.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            onRegionChangeComplete={handleRegionChangeComplete}>
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
            />
          </MapView>

          {/* Location Pin */}
          <View style={styles.locationPinContainer}>
            <Icon name="location" size={40} color={COLORS.PRIMARY_PURPLE} />
          </View>
        </View>

        {/* Location Details */}
        <View style={styles.locationDetailsContainer}>
          <Text style={styles.addressTitle}>Selected Location</Text>
          <Text
            style={styles.addressText}
            numberOfLines={2}
            ellipsizeMode="tail">
            {currentAddress || 'Fetching address...'}
          </Text>

          {/* Current Location Button */}
          <TouchableOpacity
            style={styles.currentLocationButton}
            onPress={animateToCurrentLocation}>
            <Icon name="locate" size={24} color={COLORS.PRIMARY_PURPLE} />
            <Text style={styles.currentLocationText}>
              Use My Current Location
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_GRAY,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.DARK_GRAY,
  },
  confirmText: {
    color: COLORS.PRIMARY_PURPLE,
    fontWeight: '600',
  },
  mapContainer: {
    flex: 0.7,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locationPinContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  locationDetailsContainer: {
    flex: 0.3,
    padding: 16,
    backgroundColor: COLORS.BACKGROUND_WHITE,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.DARK_GRAY,
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.SOFT_GRAY,
    marginBottom: 16,
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY_PURPLE,
    paddingVertical: 12,
    borderRadius: 8,
  },
  currentLocationText: {
    marginLeft: 8,
    color: COLORS.PRIMARY_PURPLE,
    fontWeight: '600',
  },
});

export default MapLocationPickerModal;
