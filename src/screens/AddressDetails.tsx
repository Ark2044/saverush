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
import TopBar from '../components/location-screen/TopBar';
import {COLORS} from '../../utils/Colors';
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

const AddressDetails: React.FC<Props> = ({navigation, route}) => {
  const {selectedLocation, coordinates} = route.params;

  const [addressType, setAddressType] = useState<'Home' | 'Work' | 'Other'>(
    'Home',
  );
  const [flatNumber, setFlatNumber] = useState('');
  const [landmark, setLandmark] = useState('');
  const [instruction, setInstruction] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const validateForm = useCallback((): boolean => {
    if (!flatNumber.trim()) {
      Alert.alert('Missing Information', 'Please enter your flat/house number');
      return false;
    }

    if (!contactName.trim()) {
      Alert.alert('Missing Information', 'Please enter a contact name');
      return false;
    }

    if (!contactPhone.trim()) {
      Alert.alert('Invalid Phone', 'Please enter a phone number');
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(contactPhone)) {
      Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number');
      return false;
    }

    return true;
  }, [flatNumber, contactName, contactPhone]);

  const handleSaveAddress = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Create full address object
      const fullAddress = {
        type: addressType,
        address: selectedLocation,
        flatNumber,
        landmark,
        instruction,
        contactName,
        contactPhone,
        coordinates,
        timestamp: new Date().toISOString(), // Add timestamp for sorting/tracking
      };

      // Save to saved addresses
      const savedAddresses = await AsyncStorage.getItem('savedLocations');
      let addresses = [];
      
      try {
        addresses = savedAddresses ? JSON.parse(savedAddresses) : [];
        if (!Array.isArray(addresses)) {
          addresses = [];
        }
      } catch (parseError) {
        console.error('Error parsing saved addresses:', parseError);
        addresses = [];
      }

      // Format the address string for display
      const addressString = `${addressType} - ${flatNumber}, ${selectedLocation}`;

      // Only add if not already in list
      if (!addresses.includes(addressString)) {
        addresses = [addressString, ...addresses].slice(0, 5); // Keep only 5 addresses
        await AsyncStorage.setItem('savedLocations', JSON.stringify(addresses));
      }

      // Save full address details separately
      const fullAddresses = await AsyncStorage.getItem('fullAddresses');
      let addressesDetails = {};
      
      try {
        addressesDetails = fullAddresses ? JSON.parse(fullAddresses) : {};
      } catch (parseError) {
        console.error('Error parsing full addresses:', parseError);
        addressesDetails = {};
      }
      
      addressesDetails[addressString] = fullAddress;
      await AsyncStorage.setItem(
        'fullAddresses',
        JSON.stringify(addressesDetails),
      );

      // Navigate to Home screen with the full address details
      navigation.navigate('Home', {
        selectedLocation: addressString,
        coordinates,
      });
    } catch (error) {
      console.error('Error saving address:', error);
      Alert.alert('Error', 'There was a problem saving your address.');
    }
  }, [
    validateForm,
    addressType,
    selectedLocation,
    flatNumber,
    landmark,
    instruction,
    contactName,
    contactPhone,
    coordinates,
    navigation,
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.PRIMARY_PURPLE}
      />
      <TopBar title="Complete Address" onBackPress={handleBackPress} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <ScrollView style={styles.container}>
          <View style={styles.locationView}>
            <Icon name="location" size={24} color={COLORS.PRIMARY_PURPLE} />
            <Text style={styles.locationText}>{selectedLocation}</Text>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Address Type</Text>
            <View style={styles.addressTypeContainer}>
              {['Home', 'Work', 'Other'].map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.addressTypeButton,
                    addressType === type && styles.addressTypeButtonActive,
                  ]}
                  onPress={() =>
                    setAddressType(type as 'Home' | 'Work' | 'Other')
                  }>
                  <Text
                    style={[
                      styles.addressTypeText,
                      addressType === type && styles.addressTypeTextActive,
                    ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Flat / House / Floor *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="E.g. Flat 101, Floor 3, Tower B"
              value={flatNumber}
              onChangeText={setFlatNumber}
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Landmark (Optional)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="E.g. Near ABC School"
              value={landmark}
              onChangeText={setLandmark}
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Contact Name *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Name of person at this address"
              value={contactName}
              onChangeText={setContactName}
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Contact Phone *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Phone number for delivery"
              value={contactPhone}
              onChangeText={setContactPhone}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>
              Delivery Instructions (Optional)
            </Text>
            <TextInput
              style={[styles.textInput, styles.instructionInput]}
              placeholder="E.g. Ring doorbell, call when nearby, etc."
              value={instruction}
              onChangeText={setInstruction}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveAddress}>
            <Text style={styles.saveButtonText}>Save & Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_PURPLE,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_WHITE,
    padding: 16,
  },
  locationView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_GRAY,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  locationText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.DARK_GRAY,
  },
  formSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.PRIMARY_PURPLE,
    marginBottom: 8,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressTypeButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  addressTypeButtonActive: {
    backgroundColor: COLORS.PRIMARY_PURPLE,
  },
  addressTypeText: {
    fontSize: 16,
    color: COLORS.DARK_GRAY,
  },
  addressTypeTextActive: {
    color: COLORS.BACKGROUND_WHITE,
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: COLORS.DARK_GRAY,
  },
  instructionInput: {
    height: 100,
    paddingTop: 12,
  },
  saveButton: {
    backgroundColor: COLORS.ACCENT_GREEN,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.DARK_GRAY,
  },
});

export default AddressDetails;
