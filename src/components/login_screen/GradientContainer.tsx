// GradientContainer.js (Create this file if it doesn't exist or modify the existing one)
import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientContainerProps {
  imageSource: any; // Replace 'any' with the appropriate type if known
}

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
    width: '30%', // Takes up roughly 1/3 of the row width with margins
    aspectRatio: 1, // Keeps it square
    borderRadius: 30,
    overflow: 'hidden',
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '70%',
  },
});

export default GradientContainer;
