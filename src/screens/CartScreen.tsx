import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  View,
  Image,
} from 'react-native';
import CommonNavbar from '../components/CommonNavbar';
import CartItem from '../components/cart_screen/CartItem';
import Icon from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('window');

const CartPage: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CommonNavbar text="Bag 1 item" />
      <CartItem />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>See all coupons</Text>
        <Icon
          name="angle-right"
          size={height * 0.014}
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
      <View style={styles.like}>
        <Text style={styles.likeTitle}>You may also like</Text>
        <View style={styles.likeItemsContainer}>
          {/* First item */}
          <View>
            <View style={styles.likePic}>
              <Image
                source={require('../assets/images/butter.png')}
                style={styles.likeImage}
              />
            </View>
            <Text style={styles.likeItemTitle}>Amul Butter</Text>
            <View style={styles.weightPrice}>
              <Text style={styles.weightText}>250gm</Text>
              <Text style={styles.priceText}>₹ 47</Text>
            </View>
            <TouchableOpacity style={styles.addlike}>
              <Text>Add to cart</Text>
            </TouchableOpacity>
          </View>
          {/* Second item */}
          <View>
            <View style={styles.likePic}>
              <Image
                source={require('../assets/images/butter.png')}
                style={styles.likeImage}
              />
            </View>
            <Text style={styles.likeItemTitle}>Amul Butter</Text>
            <View style={styles.weightPrice}>
              <Text style={styles.weightText}>250gm</Text>
              <Text style={styles.priceText}>₹ 47</Text>
            </View>
            <TouchableOpacity style={styles.addlike}>
              <Text>Add to cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.address}>
          <View style={styles.addressLeft}>
            <Text style={styles.addressTitle}>Gateway of India</Text>
            <Icon name="angle-down" size={20} style={styles.addressIcon} />
          </View>
          <Text style={styles.addressConfirm}>Confirm Your Address</Text>
        </View>
        <View style={styles.bottom}>
          <View>
            <Text style={styles.totalBig}>₹100</Text>
            <Text style={styles.totalSmall}>Grand Total</Text>
          </View>
          <TouchableOpacity style={styles.payoutButton}>
            <Text style={styles.payoutButtonText}>Proceed to pay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'rgba(230, 221, 255, 0.8)',
    alignItems: 'center',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.3,
    fontSize: height * 0.014,
    borderRadius: 40,
    width: width * 0.9,
    alignSelf: 'center',
    marginVertical: height * 0.02,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 7,
  },
  buttonText: {
    alignSelf: 'center',
  },
  buttonIcon: {
    alignSelf: 'center',
    marginLeft: width * 0.02,
  },
  like: {
    width: width * 0.9,
    alignSelf: 'center',
    marginVertical: height * 0.02,
    borderRadius: height * 0.02,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 7,
  },
  likeTitle: {
    alignSelf: 'center',
    fontSize: height * 0.02,
    marginVertical: height * 0.015,
  },
  likeItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likePic: {
    height: height * 0.12,
    backgroundColor: 'rgba(230, 221, 255, 0.8)',
    padding: height * 0.01,
    marginHorizontal: height * 0.03,
    borderRadius: height * 0.04,
  },
  likeImage: {
    height: '90%',
  },
  likeItemTitle: {
    alignSelf: 'center',
    marginVertical: height * 0.008,
    fontWeight: '600',
  },
  weightPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginHorizontal: height * 0.03,
    marginVertical: height * 0.002,
  },
  weightText: {
    color: 'rgba(0, 0, 0, 0.4)',
  },
  priceText: {},
  addlike: {
    alignSelf: 'center',
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
    padding: height * 0.008,
    borderRadius: height * 0.02,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 7,
    width: '80%',
    alignItems: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  address: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: height * 0.01,
    height: height * 0.05,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.6)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  addressLeft: {
    flexDirection: 'row',
  },
  addressTitle: {
    fontWeight: 'bold',
    alignSelf: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 1,
  },
  addressIcon: {
    alignSelf: 'center',
    marginLeft: height * 0.005,
  },
  addressConfirm: {
    alignSelf: 'center',
  },
  totalBig: {
    fontSize: height * 0.03,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 1,
  },
  totalSmall: {
    color: 'white',
    fontSize: height * 0.02,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 1,
  },
  payoutButton: {
    backgroundColor: 'rgba(179, 255, 83, 1)',
    padding: height * 0.01,
    borderRadius: height * 0.03,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 1,
  },
  payoutButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: height * 0.028,
  },
  bottom: {
    flexDirection: 'row',
    backgroundColor: 'rgba(84, 43, 201, 1)',
    width: width,
    justifyContent: 'space-between',
    padding: height * 0.02,
  },
});

export default CartPage;
