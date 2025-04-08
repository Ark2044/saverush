import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackParams';
import {RouteProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AddressDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddressDetails'
>;

type AddressDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'AddressDetails'
>;

type Props = {
  navigation: AddressDetailsScreenNavigationProp;
  route: AddressDetailsScreenRouteProp;
};

const AddressDetailsScreen: React.FC<Props> = ({navigation, route}) => {
  const {selectedLocation, coordinates} = route.params;
  const [addressDetails, setAddressDetails] = useState({
    flatNo: '',
    landmark: '',
    addressType: 'Home',
    receiverDetails: '',
  });

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSaveAddress = useCallback(async () => {
    if (!addressDetails.flatNo) {
      Alert.alert('Error', 'Please fill in the required fields');
      return;
    }

    try {
      const fullAddress = {
        location: selectedLocation,
        flatNo: addressDetails.flatNo,
        landmark: addressDetails.landmark,
        type: addressDetails.addressType,
        receiverDetails: addressDetails.receiverDetails,
        coordinates,
      };

      // Save to AsyncStorage
      const savedAddresses = await AsyncStorage.getItem('savedLocations');
      let addresses = savedAddresses ? JSON.parse(savedAddresses) : [];

      // Format for display
      const displayAddress = `${addressDetails.flatNo}, ${selectedLocation}`;
      addresses = [displayAddress, ...addresses];

      await AsyncStorage.setItem('savedLocations', JSON.stringify(addresses));
      await AsyncStorage.setItem(
        `address_${displayAddress}`,
        JSON.stringify(fullAddress),
      );

      // Navigate to Home screen
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving address:', error);
      Alert.alert('Error', 'Failed to save address. Please try again.');
    }
  }, [addressDetails, selectedLocation, coordinates, navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Address</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.locationCard}>
          <Text style={styles.locationText}>{selectedLocation}</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Add Address</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>House No. & Floor *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter house/flat number"
              value={addressDetails.flatNo}
              onChangeText={text =>
                setAddressDetails({...addressDetails, flatNo: text})
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Landmark & Area Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter landmark"
              value={addressDetails.landmark}
              onChangeText={text =>
                setAddressDetails({...addressDetails, landmark: text})
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Label</Text>
            <View style={styles.labelContainer}>
              {['Home', 'Work', 'Other'].map(label => (
                <TouchableOpacity
                  key={label}
                  style={[
                    styles.labelButton,
                    addressDetails.addressType === label &&
                      styles.selectedLabelButton,
                  ]}
                  onPress={() =>
                    setAddressDetails({...addressDetails, addressType: label})
                  }>
                  <Text
                    style={[
                      styles.labelText,
                      addressDetails.addressType === label &&
                        styles.selectedLabelText,
                    ]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Receivers Contact Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter contact details"
              value={addressDetails.receiverDetails}
              onChangeText={text =>
                setAddressDetails({...addressDetails, receiverDetails: text})
              }
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
        <Text style={styles.saveButtonText}>Save Address</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContainer: {
    flex: 1,
  },
  locationCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  locationText: {
    fontSize: 16,
    color: '#333',
  },
  formContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedLabelButton: {
    backgroundColor: '#e6f9d8',
    borderWidth: 1,
    borderColor: '#9ee659',
  },
  labelText: {
    fontSize: 14,
    color: '#666',
  },
  selectedLabelText: {
    color: '#333',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#9ee659',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddressDetailsScreen;
