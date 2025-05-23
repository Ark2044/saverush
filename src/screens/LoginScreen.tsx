import React, {useState, useRef, useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Keyboard,
  Animated,
  TouchableWithoutFeedback,
  ActivityIndicator,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BrandSection from '../components/login_screen/BrandSection';
import PhoneInput, {
  Country,
  COUNTRIES,
} from '../components/login_screen/PhoneInput';
import SocialLoginButtons from '../components/login_screen/SocialLoginButtons';
import {colors} from '../../utils/Colors';
import {RootStackParamList} from '../../navigation/RootStackParams';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const LoginScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const requiredLength = selectedCountry.phoneLength || 10;
    setIsValid(phoneNumber.length === requiredLength);
  }, [phoneNumber, selectedCountry]);

  const handleContinue = (): void => {
    if (!isValid) {
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();

      Alert.alert(
        'Invalid Phone Number',
        `Please enter a valid ${selectedCountry.phoneLength}-digit mobile number`,
      );
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Success',
        `Verification code sent to ${selectedCountry.code} ${phoneNumber}`,
      );
      nav.navigate('Otp', {phoneNumber, countryCode: selectedCountry.code});
    }, 1500);
  };

  const handleSkipLogin = (): void => {
    nav.navigate('Location');
  };

  const dismissKeyboard = (): void => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#542BC9" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <LinearGradient
            colors={['#542BC9', '#291563']}
            style={styles.container}>
            <ScrollView
              contentContainerStyle={[
                styles.scrollContent,
                keyboardVisible && styles.scrollContentKeyboardVisible,
              ]}
              showsVerticalScrollIndicator={false}
              bounces={false}
              keyboardShouldPersistTaps="handled">
              <BrandSection keyboardVisible={keyboardVisible} />

              <View style={styles.formSection}>
                <PhoneInput
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  isValid={isValid}
                  shakeAnimation={shakeAnimation}
                  handleContinue={handleContinue}
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                />

                <TouchableOpacity
                  style={[
                    styles.continueButton,
                    isValid ? styles.activeButton : styles.inactiveButton,
                  ]}
                  onPress={handleContinue}
                  disabled={isLoading || !isValid}
                  accessible={true}
                  accessibilityLabel="Continue button"
                  accessibilityHint="Tap to continue with phone verification">
                  {isLoading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text style={styles.continueButtonText}>Continue</Text>
                  )}
                </TouchableOpacity>

                <Text style={styles.orDivider}>OR</Text>
                <SocialLoginButtons />

                <TouchableOpacity
                  style={styles.skipButton}
                  onPress={handleSkipLogin}>
                  <Text style={styles.skipButtonText}>Skip Login</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.disclaimer}>
                By continuing, you agree to our{' '}
                <Text style={styles.link}>Terms of Use</Text> &amp;{' '}
                <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </ScrollView>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#542BC9',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
    paddingBottom: 30,
    minHeight: SCREEN_HEIGHT * 0.9,
  },
  scrollContentKeyboardVisible: {
    paddingBottom: 20,
  },
  formSection: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  continueButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 15,
    height: 55,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  activeButton: {
    backgroundColor: colors.primary,
  },
  inactiveButton: {
    backgroundColor: '#8E8E8E',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orDivider: {
    color: '#E0E0E0',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 15,
    width: '100%',
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: 14,
    color: '#E0E0E0',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  link: {
    color: '#FFD166',
    fontWeight: '600',
  },
  skipButton: {
    marginTop: 20,
    padding: 10,
  },
  skipButtonText: {
    color: '#FFD166',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
