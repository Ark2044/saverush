import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

interface OtpInputsProps {
  otp: string[];
  handleChangeText: (text: string, index: number) => void;
  inputRefs: React.MutableRefObject<any[]>;
}

const INPUT_SIZE = 50;
const BORDER_RADIUS = 20;
const FONT_SIZE = 20;
const MARGIN_HORIZONTAL = 5;

const OtpInputs: React.FC<OtpInputsProps> = ({
  otp,
  handleChangeText,
  inputRefs,
}) => {
  return (
    <View style={styles.otpContainer}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => {
            inputRefs.current[index] = ref;
          }}
          style={styles.otpInput}
          keyboardType="number-pad"
          maxLength={1}
          value={digit}
          onChangeText={text => handleChangeText(text, index)}
          autoFocus={index === 0}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  otpInput: {
    width: INPUT_SIZE,
    height: INPUT_SIZE,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    fontSize: FONT_SIZE,
    color: '#333',
    marginHorizontal: MARGIN_HORIZONTAL,
    backgroundColor: '#fff',
  },
});

export default OtpInputs;
