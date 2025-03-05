import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../../utils/Colors';

interface OtpHeaderProps {
  phoneNumber: string;
  countryCode: string;
}

const HEADER_FONT_SIZE = 26;
const SUBHEADER_FONT_SIZE = 16;
const MARGIN_BOTTOM = 25;

const OtpHeader: React.FC<OtpHeaderProps> = ({phoneNumber, countryCode}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>OTP Verification</Text>
      <Text style={styles.subHeader}>
        OTP has been sent to {countryCode} {phoneNumber}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: MARGIN_BOTTOM,
    alignItems: 'center',
  },
  header: {
    fontSize: HEADER_FONT_SIZE,
    fontWeight: '700',
    color: colors.secondary,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: SUBHEADER_FONT_SIZE,
    color: colors.secondary,
    textAlign: 'center',
  },
});

export default OtpHeader;
