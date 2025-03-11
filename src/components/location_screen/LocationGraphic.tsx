import React, {memo} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../utils/Colors';

const {width} = Dimensions.get('window');

const LocationGraphic = () => {
  return (
    <View style={styles.locationGraphicContainer}>
      <Image
        source={require('../../assets/images/location_screen/location.png')}
        style={styles.locationImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  locationGraphicContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  locationImage: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 16,
  },
  locationLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.DARK_GRAY,
  },
});

export default memo(LocationGraphic);
