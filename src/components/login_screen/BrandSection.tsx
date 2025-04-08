import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import GradientContainer from './GradientContainer';
import {colors} from '../../../utils/Colors';

interface BrandSectionProps {
  keyboardVisible: boolean;
}

interface SlidingImageProps {
  children: React.ReactNode;
  direction: 'right' | 'left';
}

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const HEADER_FONT_SIZE = SCREEN_WIDTH * 0.11; // Responsive font size
const SMALL_HEADER_FONT_SIZE = SCREEN_WIDTH * 0.08;
const MARGIN_VERTICAL = SCREEN_HEIGHT * 0.02;

const SlidingImage: React.FC<SlidingImageProps> = ({children, direction}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [slideAnim]);

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange:
      direction === 'right'
        ? [0, SCREEN_WIDTH * 0.05]
        : [0, -SCREEN_WIDTH * 0.05],
  });

  return (
    <Animated.View
      style={{
        transform: [{translateX}],
      }}>
      {children}
    </Animated.View>
  );
};

const BrandSection: React.FC<BrandSectionProps> = ({keyboardVisible}) => (
  <View
    style={[
      styles.brandSection,
      keyboardVisible && styles.collapsedBrandSection,
    ]}>
    {!keyboardVisible && (
      <>
        <View style={styles.gradientRow}>
          <SlidingImage direction="right">
            <GradientContainer
              imageSource={require('../../assets/images/login_screen/stationery.png')}
            />
          </SlidingImage>
          <SlidingImage direction="right">
            <GradientContainer
              imageSource={require('../../assets/images/login_screen/skin_care.png')}
            />
          </SlidingImage>
          <SlidingImage direction="right">
            <GradientContainer
              imageSource={require('../../assets/images/login_screen/nutella.png')}
            />
          </SlidingImage>
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.header, keyboardVisible && styles.smallHeader]}>
            SAVE RUSH
          </Text>
          <Text style={styles.tagline}>Anything, Anywhere.</Text>
        </View>

        <View style={styles.gradientRow}>
          <SlidingImage direction="left">
            <GradientContainer
              imageSource={require('../../assets/images/login_screen/chips.png')}
            />
          </SlidingImage>
          <SlidingImage direction="left">
            <GradientContainer
              imageSource={require('../../assets/images/login_screen/grocery.png')}
            />
          </SlidingImage>
          <SlidingImage direction="left">
            <GradientContainer
              imageSource={require('../../assets/images/login_screen/wheat.png')}
            />
          </SlidingImage>
        </View>
      </>
    )}
  </View>
);

const styles = StyleSheet.create({
  brandSection: {
    alignItems: 'center',
    width: '100%',
    marginBottom: SCREEN_HEIGHT * 0.03,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
  },
  collapsedBrandSection: {
    marginBottom: SCREEN_HEIGHT * 0.01,
  },
  gradientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: MARGIN_VERTICAL,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: SCREEN_HEIGHT * 0.02,
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
    lineHeight: HEADER_FONT_SIZE * 1.4,
    letterSpacing: 2,
    marginBottom: 5,
  },
  smallHeader: {
    fontSize: SMALL_HEADER_FONT_SIZE,
    lineHeight: SMALL_HEADER_FONT_SIZE * 1.4,
    marginBottom: 0,
  },
  tagline: {
    fontSize: SCREEN_WIDTH * 0.05,
    color: '#E0E0E0',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.5,
  },
});

export default BrandSection;
