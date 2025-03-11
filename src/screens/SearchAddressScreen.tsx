import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import TopBar from '../components/location_screen/TopBar';
import LocationSearchBar from '../components/location_screen/LocationSearchBar';
import MapLocationPickerModal from '../components/search_address/MapLocationPickerModal';
import {COLORS} from '../../utils/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackParams';
import {RouteProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const mockSearchResults = [
  'Connaught Place, New Delhi',
  'Cyber City, Gurgaon',
  'Sector 18, Noida',
  'Saket, New Delhi',
  'Vasant Kunj, New Delhi',
  'MG Road, Gurgaon',
];

const SearchAddress: React.FC<Props> = ({navigation, route}) => {
  const {savedLocations, currentRegion} = route.params;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isMapModalVisible, setIsMapModalVisible] = useState<boolean>(false);

  // Load recent searches from AsyncStorage
  useEffect(() => {
    const loadRecentSearches = async () => {
      try {
        const data = await AsyncStorage.getItem('recentSearches');
        if (data) {
          setRecentSearches(JSON.parse(data));
        } else {
          const defaultRecentSearches = [
            'Gandhi Bazaar Main Road, Basavanagudi',
            'Jayanagar 4th Block, Bengaluru',
            'MG Road, Bengaluru',
          ];
          setRecentSearches(defaultRecentSearches);
          await AsyncStorage.setItem(
            'recentSearches',
            JSON.stringify(defaultRecentSearches),
          );
        }
      } catch (error) {
        console.error('Error loading recent searches:', error);
        setRecentSearches([
          'Gandhi Bazaar Main Road, Basavanagudi',
          'Jayanagar 4th Block, Bengaluru',
          'MG Road, Bengaluru',
        ]);
      }
    };

    loadRecentSearches();
  }, []);

  // Filter locations based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredLocations([]);
      setIsSearching(false);
    } else {
      setIsSearching(true);

      const timer = setTimeout(() => {
        const results = mockSearchResults.filter(location =>
          location.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setFilteredLocations(results);
        setIsSearching(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  // Handle back navigation
  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Save recent search to AsyncStorage
  const saveRecentSearch = useCallback(
    async (location: string) => {
      try {
        if (!recentSearches.includes(location)) {
          const updatedSearches = [location, ...recentSearches].slice(0, 5);
          setRecentSearches(updatedSearches);
          await AsyncStorage.setItem(
            'recentSearches',
            JSON.stringify(updatedSearches),
          );
        }
      } catch (error) {
        console.error('Error saving recent search:', error);
      }
    },
    [recentSearches],
  );

  // Handle location selection
  const handleSelectLocation = useCallback(
    async (
      location:
        | string
        | {address?: string; latitude: number; longitude: number},
    ) => {
      let selectedLocationText: string;
      let coordinates: {latitude: number; longitude: number};

      if (typeof location === 'string') {
        selectedLocationText = location;
        coordinates = {
          latitude: currentRegion.latitude,
          longitude: currentRegion.longitude,
        };
        await saveRecentSearch(location);
      } else {
        selectedLocationText = location.address || 'Unknown Address';
        coordinates = {
          latitude: location.latitude,
          longitude: location.longitude,
        };
        if (location.address) {
          await saveRecentSearch(location.address);
        }
      }

      navigation.navigate('AddressDetails', {
        selectedLocation: selectedLocationText,
        coordinates: coordinates,
      });
    },
    [saveRecentSearch, navigation, currentRegion],
  );

  // Render saved location item
  const renderSavedLocation = ({item}: {item: string}) => (
    <TouchableOpacity
      style={styles.locationItem}
      onPress={() => handleSelectLocation(item)}>
      <Icon
        name="home"
        size={24}
        color={COLORS.PRIMARY_PURPLE}
        style={styles.locationIcon}
      />
      <View style={styles.locationTextContainer}>
        <Text style={styles.locationText}>{item}</Text>
        <Text style={styles.locationSubtext}>Saved Address</Text>
      </View>
      <Icon name="chevron-forward" size={24} color={COLORS.SOFT_GRAY} />
    </TouchableOpacity>
  );

  // Render search result item
  const renderSearchResult = ({item}: {item: string}) => (
    <TouchableOpacity
      style={styles.locationItem}
      onPress={() => handleSelectLocation(item)}>
      <Icon
        name="location"
        size={24}
        color={COLORS.SOFT_GRAY}
        style={styles.locationIcon}
      />
      <View style={styles.locationTextContainer}>
        <Text style={styles.locationText}>{item}</Text>
      </View>
      <Icon name="chevron-forward" size={24} color={COLORS.SOFT_GRAY} />
    </TouchableOpacity>
  );

  // Render recent search item
  const renderRecentSearch = ({item}: {item: string}) => (
    <TouchableOpacity
      style={styles.locationItem}
      onPress={() => handleSelectLocation(item)}>
      <Icon
        name="time"
        size={24}
        color={COLORS.SOFT_GRAY}
        style={styles.locationIcon}
      />
      <View style={styles.locationTextContainer}>
        <Text style={styles.locationText}>{item}</Text>
        <Text style={styles.locationSubtext}>Recent Search</Text>
      </View>
      <Icon name="chevron-forward" size={24} color={COLORS.SOFT_GRAY} />
    </TouchableOpacity>
  );

  // Render section header
  const renderSectionHeader = (title: string) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.PRIMARY_PURPLE}
      />
      <TopBar title="Search Address" onBackPress={handleBackPress} />
      <View style={styles.container}>
        <LocationSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          autoFocus={true}
        />

        {isSearching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.PRIMARY_PURPLE} />
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        ) : (
          <FlatList
            data={[]}
            ListHeaderComponent={
              <>
                {searchQuery.length > 0 && filteredLocations.length > 0 && (
                  <>
                    {renderSectionHeader('Search Results')}
                    <FlatList
                      data={filteredLocations}
                      renderItem={renderSearchResult}
                      keyExtractor={(item, index) => `result-${index}`}
                      scrollEnabled={false}
                    />
                  </>
                )}

                {searchQuery.length === 0 && (
                  <>
                    <TouchableOpacity
                      style={styles.useMapButton}
                      onPress={() => setIsMapModalVisible(true)}>
                      <Icon
                        name="map"
                        size={24}
                        color={COLORS.PRIMARY_PURPLE}
                        style={styles.locationIcon}
                      />
                      <View style={styles.locationTextContainer}>
                        <Text style={styles.locationText}>
                          Use map to select location
                        </Text>
                        <Text style={styles.locationSubtext}>
                          Drag the pin to your exact location
                        </Text>
                      </View>
                      <Icon
                        name="chevron-forward"
                        size={24}
                        color={COLORS.SOFT_GRAY}
                      />
                    </TouchableOpacity>

                    {savedLocations.length > 0 && (
                      <>
                        {renderSectionHeader('Saved Addresses')}
                        <FlatList
                          data={savedLocations}
                          renderItem={renderSavedLocation}
                          keyExtractor={(item, index) => `saved-${index}`}
                          scrollEnabled={false}
                        />
                      </>
                    )}

                    {recentSearches.length > 0 && (
                      <>
                        {renderSectionHeader('Recent Searches')}
                        <FlatList
                          data={recentSearches}
                          renderItem={renderRecentSearch}
                          keyExtractor={(item, index) => `recent-${index}`}
                          scrollEnabled={false}
                        />
                      </>
                    )}
                  </>
                )}
              </>
            }
            renderItem={undefined}
          />
        )}
      </View>

      {/* Map Location Picker Modal */}
      <MapLocationPickerModal
        isVisible={isMapModalVisible}
        initialLocation={{
          latitude: currentRegion.latitude,
          longitude: currentRegion.longitude,
        }}
        onClose={() => setIsMapModalVisible(false)}
        onLocationSelect={handleSelectLocation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_PURPLE,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_WHITE,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.SOFT_GRAY,
    fontSize: 16,
  },
  sectionHeader: {
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.PRIMARY_PURPLE,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_GRAY,
  },
  locationIcon: {
    marginRight: 16,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationText: {
    fontSize: 16,
    color: COLORS.DARK_GRAY,
  },
  locationSubtext: {
    fontSize: 12,
    color: COLORS.SOFT_GRAY,
    marginTop: 4,
  },
  useMapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_GRAY,
  },
});

export default React.memo(SearchAddress);
