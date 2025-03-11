import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const {height} = Dimensions.get('window');

interface CouponProps {
  id: string;
  content: string;
}

const Coupon: React.FC<CouponProps> = props => {
  return (
    <View style={styles.container}>
      <View style={styles.rotatedTextContainer}>
        <Text style={styles.rotatedText}>{props.id}</Text>
      </View>
      <Text style={styles.contentText}>{props.content}</Text>
    </View>
  );
};

export default Coupon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(230, 221, 255, 0.8)',
    width: '40%',
    margin: height * 0.015,
    height: height * 0.1,
    borderRadius: height * 0.02,
  },
  rotatedTextContainer: {
    alignSelf: 'center',
  },
  rotatedText: {
    transform: [{rotate: '90deg'}],
    color: 'black',
    marginBottom: 'auto',
    alignSelf: 'center',
  },
  contentText: {
    color: 'black',
    flexWrap: 'wrap',
    overflow: 'hidden',
    marginTop: height * 0.01,
  },
});
