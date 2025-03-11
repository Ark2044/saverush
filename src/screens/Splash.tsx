import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackParams';

const Splash = () => {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      nav.replace('Login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [nav]);

  return (
    <LinearGradient colors={colors.backgroundGradient} style={styles.container}>
      {/* Blur effect overlay */}
      <BlurView style={styles.blur} blurType="light" blurAmount={10} />

      <View style={styles.textContainer}>
        <Text style={styles.heading}>SAVE RUSH</Text>
        <Text style={styles.subHeading}>Anything, Anywhere.</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blur: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
  },
  textContainer: {
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Poppins-Black',
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 40,
    lineHeight: 60,
    color: colors.primary,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 4,
  },
  subHeading: {
    fontFamily: 'Poppins-ExtraBold',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 20,
    lineHeight: 30,
    color: colors.secondary,
    textAlign: 'center',
  },
});

export default Splash;
