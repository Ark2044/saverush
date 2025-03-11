import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {firebase, getAuth} from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import {RootStackParamList} from '../../navigation/RootStackParams';
import {firebaseConfig} from '../../AppFirebaseConfig';

type OtpScreenRouteProp = RouteProp<RootStackParamList, 'Otp'>;
type OtpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Otp'
>;

const OtpScreen = () => {
  // Navigation and route
  const navigation = useNavigation<OtpScreenNavigationProp>();
  const route = useRoute<OtpScreenRouteProp>();
  const {phoneNumber, countryCode} = route.params;
  const formattedPhoneNumber = `${countryCode} ${phoneNumber}`;

  // State variables
  const [confirm, setConfirm] = useState<any>(null);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [verificationMessage, setVerificationMessage] = useState<string>('');
  const [timer, setTimer] = useState<number>(30);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);

  // References for OTP input fields
  const inputRefs = useRef<Array<TextInput | null>>(Array(6).fill(null));

  // Listen for authentication state changes (e.g., auto-verification on Android)
  useEffect(() => {
    const subscriber = getAuth().onAuthStateChanged(user => {
      if (user) {
        console.log('User automatically authenticated');
        navigation.navigate('Location');
      }
    });
    return subscriber; // Unsubscribe on unmount
  }, [navigation]);

  // Timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0 && isResendDisabled) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer, isResendDisabled]);

  // Send verification code
  const sendVerificationCode = useCallback(async () => {
    setIsLoading(true);
    try {
      firebase.initializeApp(firebaseConfig);
      const auth = getAuth();
      // @ts-ignore - Using deprecated method until updated
      const confirmation = await auth.signInWithPhoneNumber(
        formattedPhoneNumber,
      );
      setConfirm(confirmation);
      setVerificationMessage(
        `Verification code sent to ${formattedPhoneNumber}`,
      );
    } catch (error: any) {
      let errorMessage = 'Failed to send verification code';
      if (error.code === 'auth/invalid-phone-number') {
        errorMessage = 'The phone number format is incorrect';
      } else if (error.code === 'auth/quota-exceeded') {
        errorMessage = 'Too many attempts. Please try again later';
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [formattedPhoneNumber]);

  // Resend verification code
  const handleResendOtp = async () => {
    setOtp(Array(6).fill(''));
    setTimer(30);
    setIsResendDisabled(true);
    await sendVerificationCode();
  };

  // Handle OTP input change for each field
  const handleOtpChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = text.slice(0, 1);
    setOtp(newOtp);
    // Move focus to next input if exists and current field is filled
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Auto-submit when all OTP fields are filled
  useEffect(() => {
    if (otp.every(digit => digit !== '')) {
      const otpValue = otp.join('');
      confirmCode(otpValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  // Handle backspace key press
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  // Confirm the verification code
  const confirmCode = async (otpValue: string = otp.join('')) => {
    if (isLoading) {
      return;
    }
    if (!confirm) {
      Alert.alert('Error', 'Please wait for the verification code to be sent');
      return;
    }
    if (otpValue.length !== 6) {
      Alert.alert(
        'Invalid Code',
        'Please enter a complete 6-digit verification code',
      );
      return;
    }
    setIsLoading(true);
    try {
      await confirm.confirm(otpValue);
      console.log('Phone authentication successful');
      // Navigation will also be handled by onAuthStateChanged if auto-verification occurs
      navigation.navigate('Location');
    } catch (error: any) {
      let errorMessage = 'Invalid verification code';
      if (error.code === 'auth/session-expired') {
        errorMessage =
          'The verification session has expired. Please request a new code';
      }
      Alert.alert('Verification Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Send verification code when the component mounts
  useEffect(() => {
    sendVerificationCode();
  }, [sendVerificationCode]);

  return (
    <LinearGradient colors={['#542BC9', '#291563']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled">
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Verification Code</Text>
              <Text style={styles.headerSubtitle}>
                Enter the code sent to {formattedPhoneNumber}
              </Text>
            </View>

            {/* Verification message */}
            {verificationMessage ? (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{verificationMessage}</Text>
              </View>
            ) : null}

            {/* OTP Input Fields */}
            <View style={styles.otpContainer}>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <TextInput
                    key={`otp-${index}`}
                    ref={el => {
                      inputRefs.current[index] = el;
                    }}
                    style={styles.otpInput}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={otp[index]}
                    onChangeText={text => handleOtpChange(text, index)}
                    onKeyPress={e => handleKeyPress(e, index)}
                    autoFocus={index === 0}
                  />
                ))}
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              style={[styles.verifyButton, isLoading && styles.disabledButton]}
              onPress={() => confirmCode()}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.buttonText}>Verify</Text>
              )}
            </TouchableOpacity>

            {/* Resend Timer */}
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>Didn't receive code? </Text>
              {isResendDisabled ? (
                <Text style={styles.timerText}>Resend in {timer}s</Text>
              ) : (
                <TouchableOpacity
                  onPress={handleResendOtp}
                  disabled={isLoading}>
                  <Text style={styles.resendButtonText}>Resend Code</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const colors = {
  primary: '#542BC9',
  secondary: '#291563',
  white: '#FFFFFF',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  border: 'rgba(255, 255, 255, 0.3)',
  error: '#FF6B6B',
  success: '#4CAF50',
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
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  messageContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  messageText: {
    color: colors.textPrimary,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: colors.white,
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 4,
  },
  verifyButton: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: 'rgba(84, 43, 201, 0.6)',
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  timerText: {
    color: colors.textPrimary,
    fontSize: 16,
  },
  resendButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OtpScreen;
