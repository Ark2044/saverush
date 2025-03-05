import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const nav = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      nav.navigate('Login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [nav]);

  return (
    <LinearGradient
      colors={colors.backgroundGradient}
      style={styles.container}>
      <View>
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
