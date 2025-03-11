import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CommonNavbar from '../components/CommonNavbar';

const {width, height} = Dimensions.get('window');

const SubView: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);

  const inc = () => setQuantity(prev => prev + 1);
  const dec = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonNavbar text="Dairy, Bread & Eggs" />
      <View style={styles.productRow}>
        {/* First Product */}
        <View>
          <View style={styles.likePic}>
            <Image
              source={require('../assets/images/butter.png')}
              style={styles.productImage}
            />
          </View>
          <Text style={styles.productTitle}>Amul Butter</Text>
          <View style={styles.weightPrice}>
            <Text style={styles.weightText}>250gm</Text>
            <Text style={styles.priceText}>₹ 47</Text>
          </View>
          <TouchableOpacity style={styles.addlike}>
            <Text>Add to cart</Text>
          </TouchableOpacity>
        </View>

        {/* Second Product */}
        <View>
          <View style={styles.likePic}>
            <Image
              source={require('../assets/images/butter.png')}
              style={styles.productImage}
            />
          </View>
          <Text style={styles.productTitle}>Amul Butter</Text>
          <View style={styles.weightPrice}>
            <Text style={styles.weightText}>250gm</Text>
            <Text style={styles.priceText}>₹ 47</Text>
          </View>
          <TouchableOpacity style={styles.addlike}>
            <Text>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.cart}>
          <Text style={styles.summary}>1 item | ₹47</Text>
          <TouchableOpacity style={styles.goToCartButton}>
            <Text style={styles.goToCartText}>Go to Cart</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.address}>
          <View style={styles.dairy}>
            <Image
              source={require('../assets/images/milk.png')}
              style={styles.dairyImage}
            />
            <Text style={styles.dairyText}>Milk</Text>
          </View>

          <View style={styles.dairy}>
            <Image
              source={require('../assets/images/eggs.png')}
              style={styles.dairyImage}
            />
            <Text style={styles.dairyText}>Eggs</Text>
          </View>

          <View style={styles.dairy}>
            <Image
              source={require('../assets/images/dahi.png')}
              style={styles.dairyImage}
            />
            <Text style={styles.dairyText}>Dahi</Text>
          </View>
        </View>
      </View>

      <View style={styles.qty}>
        <View style={styles.qtyContainer}>
          <TouchableOpacity onPress={inc} style={styles.qtyButtons}>
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{quantity}</Text>
          <TouchableOpacity
            onPress={dec}
            style={styles.qtyButtons}
            disabled={quantity === 0}>
            <Text style={styles.qtyButtonText}>-</Text>
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
  productRow: {
    flexDirection: 'row',
    margin: height * 0.02,
  },
  likePic: {
    height: height * 0.12,
    backgroundColor: 'rgba(230, 221, 255, 0.8)',
    padding: height * 0.01,
    marginHorizontal: height * 0.03,
    borderRadius: height * 0.04,
  },
  productImage: {
    height: '90%',
  },
  productTitle: {
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
    borderRadius: height * 0.02,
    alignSelf: 'center',
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
    padding: height * 0.008,
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
    width: width,
  },
  cart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(84, 43, 201, 1)',
    padding: height * 0.015,
    margin: height * 0.03,
    borderRadius: height * 0.04,
  },
  summary: {
    color: 'white',
    fontWeight: '600',
    fontSize: height * 0.02,
    alignSelf: 'center',
    width: '40%',
  },
  goToCartButton: {
    backgroundColor: '#fff',
    borderRadius: height * 0.02,
    padding: height * 0.01,
  },
  goToCartText: {
    fontSize: height * 0.02,
    fontWeight: '600',
    paddingHorizontal: width * 0.08,
  },
  address: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: height * 0.01,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.6)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dairy: {
    backgroundColor: 'rgba(230, 221, 255, 0.8)',
    height: height * 0.12,
    width: width * 0.25,
    alignItems: 'center',
    borderRadius: height * 0.02,
  },
  dairyImage: {
    alignSelf: 'center',
    maxHeight: '100%',
    maxWidth: '100%',
  },
  dairyText: {
    fontWeight: '600',
    marginBottom: height * 0.004,
  },
  // Styles for the commented-out quantity selector
  qty: {},
  qtyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qtyButtons: {
    padding: 8,
  },
  qtyButtonText: {
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 1,
  },
  qtyText: {
    alignSelf: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 1,
  },
});

export default SubView;
