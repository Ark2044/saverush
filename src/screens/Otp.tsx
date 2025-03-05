import React, {useState, useRef, useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {Text} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import OtpHeader from '../components/otp_screen/OtpHeader';
import OtpInputs from '../components/otp_screen/OtpInputs';
import ResendTimer from '../components/otp_screen/ResendTimer';
import {colors} from '../../utils/Colors';

type RootStackParamList = {
  Otp: {phoneNumber: string; countryCode: string};
  Location: undefined;
};

const OtpScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Otp'>>();
  const nav =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Otp'>>();
  const {phoneNumber, countryCode} = route.params;

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<any[]>([]);
  const [timer, setTimer] = useState<number>(30);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);

  // Countdown timer effect
  useEffect(() => {
    if (timer === 0) {
      setIsResendDisabled(false);
      return;
    }
    const intervalId = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer]);

  const handleResendOtp = (): void => {
    Alert.alert(
      'OTP Resent',
      `A new OTP has been sent to ${countryCode} ${phoneNumber}`,
    );
    setTimer(30);
    setIsResendDisabled(true);
  };

  // Update OTP array and auto-focus next or previous input
  const handleChangeText = (text: string, index: number): void => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text !== '' && index < 5) {
        inputRefs.current[index + 1].focus();
      }
      if (text === '' && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Handle OTP submission
  const handleSubmit = (): void => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      Alert.alert('OTP Submitted', `Your OTP is: ${otpValue}`);
      console.log('OTP Submitted:', otpValue);
      nav.navigate('Location');
    } else {
      Alert.alert('Invalid OTP', 'Please enter a complete 6-digit OTP.');
    }
  };

  return (
    <LinearGradient colors={['#542BC9', '#291563']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}>
          <ScrollView contentContainerStyle={styles.content}>
            <OtpHeader phoneNumber={phoneNumber} countryCode={countryCode} />
            <OtpInputs
              otp={otp}
              handleChangeText={handleChangeText}
              inputRefs={inputRefs}
            />
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleSubmit}>
              <Text style={styles.verifyButtonText}>Verify OTP</Text>
            </TouchableOpacity>
            <ResendTimer
              timer={timer}
              isResendDisabled={isResendDisabled}
              onResendOtp={handleResendOtp}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  verifyButton: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OtpScreen;
