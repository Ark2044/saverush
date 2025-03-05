import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GradientContainer from './GradientContainer';
import { colors } from '../../../utils/Colors';

interface BrandSectionProps {
  keyboardVisible: boolean;
}

const HEADER_FONT_SIZE = 42;
const SMALL_HEADER_FONT_SIZE = 32;
const MARGIN_VERTICAL = 10;

const BrandSection: React.FC<BrandSectionProps> = ({keyboardVisible}) => (
  <View
    style={[
      styles.brandSection,
      keyboardVisible && styles.collapsedBrandSection,
    ]}>
    {!keyboardVisible && (
      <>
        <View style={styles.gradientRow}>
          <GradientContainer
            imageSource={require('../../assets/images/login_screen/stationery.png')}
          />
          <GradientContainer
            imageSource={require('../../assets/images/login_screen/skin_care.png')}
          />
          <GradientContainer
            imageSource={require('../../assets/images/login_screen/nutella.png')}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.header, keyboardVisible && styles.smallHeader]}>
            SAVE RUSH
          </Text>
          <Text style={styles.tagline}>Anything, Anywhere.</Text>
        </View>

        <View style={styles.gradientRow}>
          <GradientContainer
            imageSource={require('../../assets/images/login_screen/chips.png')}
          />
          <GradientContainer
            imageSource={require('../../assets/images/login_screen/grocery.png')}
          />
          <GradientContainer
            imageSource={require('../../assets/images/login_screen/wheat.png')}
          />
        </View>
      </>
    )}
  </View>
);

const styles = StyleSheet.create({
  brandSection: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  collapsedBrandSection: {
    marginBottom: 10,
  },
  gradientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: MARGIN_VERTICAL,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 15,
    width: '100%',
  },
  header: {
    fontSize: HEADER_FONT_SIZE,
    fontWeight: '900',
    textAlign: 'center',
    color: colors.primary,
    fontFamily: 'Poppins-Black',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    lineHeight: 60,
    letterSpacing: 2,
    marginBottom: 5,
  },
  smallHeader: {
    fontSize: SMALL_HEADER_FONT_SIZE,
    lineHeight: 40,
    marginBottom: 0,
  },
  tagline: {
    fontSize: 20,
    color: '#E0E0E0',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.5,
  },
});

export default BrandSection;
