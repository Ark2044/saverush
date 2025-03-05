import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { colors } from '../../../utils/Colors';

interface ResendTimerProps {
  timer: number;
  isResendDisabled: boolean;
  onResendOtp: () => void;
}

const FONT_SIZE = 16;
const MARGIN_TOP = 10;

const ResendTimer: React.FC<ResendTimerProps> = ({
  timer,
  isResendDisabled,
  onResendOtp,
}) => {
  return (
    <View style={styles.resendContainer}>
      {isResendDisabled ? (
        <Text style={styles.timerText}>Resend OTP in {timer} seconds</Text>
      ) : (
        <TouchableOpacity onPress={onResendOtp}>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  resendContainer: {
    marginTop: MARGIN_TOP,
  },
  timerText: {
    fontSize: FONT_SIZE,
    color: '#ddd',
  },
  resendText: {
    fontSize: FONT_SIZE,
    color: colors.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default ResendTimer;
