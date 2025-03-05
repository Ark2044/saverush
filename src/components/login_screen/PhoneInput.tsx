import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export interface Country {
  name: string;
  code: string;
  flag: string;
  phoneLength: number;
}

export const COUNTRIES: Country[] = [
  {name: 'India', code: '+91', flag: '🇮🇳', phoneLength: 10},
  {name: 'United States', code: '+1', flag: '🇺🇸', phoneLength: 10},
  {name: 'United Kingdom', code: '+44', flag: '🇬🇧', phoneLength: 10},
  {name: 'Australia', code: '+61', flag: '🇦🇺', phoneLength: 9},
  {name: 'Canada', code: '+1', flag: '🇨🇦', phoneLength: 10},
  {name: 'Singapore', code: '+65', flag: '🇸🇬', phoneLength: 8},
  {name: 'United Arab Emirates', code: '+971', flag: '🇦🇪', phoneLength: 9},
];

interface PhoneInputProps {
  phoneNumber: string;
  setPhoneNumber: (num: string) => void;
  isValid: boolean;
  shakeAnimation: Animated.Value;
  handleContinue: () => void;
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
}

const PHONE_INPUT_HEIGHT = 55;
const BORDER_RADIUS = 30;

const PhoneInput: React.FC<PhoneInputProps> = ({
  phoneNumber,
  setPhoneNumber,
  isValid,
  shakeAnimation,
  handleContinue,
  selectedCountry,
  setSelectedCountry,
}) => {
  const [isCountryModalVisible, setIsCountryModalVisible] =
    useState<boolean>(false);

  const formatPhoneNumber = (text: string): void => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setPhoneNumber(cleaned);
  };

  const renderCountryModal = () => (
    <Modal
      visible={isCountryModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setIsCountryModalVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Country</Text>
          {COUNTRIES.map(country => (
            <TouchableOpacity
              key={country.name}
              style={styles.countryOption}
              onPress={() => {
                setSelectedCountry(country);
                setIsCountryModalVisible(false);
              }}>
              <Text style={styles.countryFlag}>{country.flag}</Text>
              <Text style={styles.countryName}>{country.name}</Text>
              <Text style={styles.countryCode}>{country.code}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsCountryModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      <Animated.View
        style={[
          styles.phoneInputContainer,
          {transform: [{translateX: shakeAnimation}]},
          isValid && styles.validInputContainer,
        ]}>
        <TouchableOpacity
          style={styles.countryCodeContainer}
          onPress={() => setIsCountryModalVisible(true)}>
          <Text style={styles.countryFlag}>{selectedCountry.flag}</Text>
          <Text style={styles.countryCodeText}>{selectedCountry.code}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.phoneInput}
          placeholder={`${selectedCountry.phoneLength}-digit mobile number`}
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={formatPhoneNumber}
          maxLength={selectedCountry.phoneLength}
          returnKeyType="done"
          onSubmitEditing={handleContinue}
          accessible={true}
          accessibilityLabel="Phone number input"
          accessibilityHint="Enter your mobile number"
        />
        {isValid && (
          <View style={styles.validIndicator}>
            <Icon name="checkmark-circle" size={24} color="#4CAF50" />
          </View>
        )}
      </Animated.View>
      {renderCountryModal()}
    </>
  );
};

const styles = StyleSheet.create({
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    marginBottom: 20,
    height: PHONE_INPUT_HEIGHT,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  validInputContainer: {
    borderColor: '#4CAF50',
    borderWidth: 1.5,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    height: '100%',
  },
  countryFlag: {
    fontSize: 20,
    marginRight: 5,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },
  validIndicator: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  countryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  countryCode: {
    color: '#888',
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default PhoneInput;
