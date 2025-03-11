import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonNavbar from '../components/CommonNavbar';
import Coupon from '../components/coupon_screen/Coupon';

const {width, height} = Dimensions.get('window');

// Base guideline dimensions (e.g., iPhone 8)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

// Scale functions for responsive sizing
const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const coupons = [
  {id: 'A2513', content: '10% off on all products'},
  {id: 'Z6290', content: '20% off on electronics'},
  {id: 'J4152', content: 'Free shipping on orders above $50'},
  {id: 'P7631', content: '$15 off on orders above $100'},
  {id: 'B2460', content: 'Buy one get one free on selected items'},
  {id: 'O5389', content: '30% off on your first purchase'},
];

export default function CouponScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CommonNavbar text={''} />
      <View style={styles.headingBox}>
        <Ionicons
          name="pricetag"
          size={moderateScale(40)}
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.heading}>COUPON CODE</Text>
        <Text style={styles.subHeading}>
          To get max discounts & offers on your cart
        </Text>
      </View>
      <View style={styles.coupons}>
        <FlatList
          data={coupons}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({item}) => (
            <Coupon id={item.id} content={item.content} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  headingBox: {
    backgroundColor: '#542bff',
    margin: scale(20),
    borderRadius: scale(12),
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: verticalScale(2)},
    shadowOpacity: 0.3,
    shadowRadius: scale(3),
    elevation: 5, // Android shadow
  },
  icon: {
    marginBottom: verticalScale(8),
  },
  heading: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: moderateScale(24),
    letterSpacing: scale(1),
    textAlign: 'center',
  },
  subHeading: {
    color: '#fff',
    fontSize: moderateScale(14),
    textAlign: 'center',
    marginTop: verticalScale(8),
  },
  coupons: {
    backgroundColor: '#fff',
    marginHorizontal: scale(20),
    marginVertical: verticalScale(20),
    borderRadius: scale(12),
    padding: scale(20),
    flex: 1,
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: verticalScale(2)},
    shadowOpacity: 0.2,
    shadowRadius: scale(4),
    elevation: 3, // Android shadow
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: verticalScale(15),
  },
});
