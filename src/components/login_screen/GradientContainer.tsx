// GradientContainer.js (Create this file if it doesn't exist or modify the existing one)
import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientContainerProps {
  imageSource: any; // Replace 'any' with the appropriate type if known
}

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const GradientContainer: React.FC<GradientContainerProps> = ({imageSource}) => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#5129C1', '#EEEEEE']} style={styles.gradient}>
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.28, // Responsive width
    aspectRatio: 1, // Keeps it square
    borderRadius: SCREEN_WIDTH * 0.08, // Responsive border radius
    overflow: 'hidden',
    marginHorizontal: SCREEN_WIDTH * 0.02, // Increased margin
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SCREEN_WIDTH * 0.04, // Responsive padding
  },
  image: {
    width: '100%',
    height: '95%', // Almost full height
  },
});

export default GradientContainer;
