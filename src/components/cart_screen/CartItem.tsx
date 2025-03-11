import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const {height, width} = Dimensions.get('window');
const ppi = 28;

const CartItem: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const price = quantity * ppi;

  const inc = (): void => setQuantity(prev => prev + 1);
  const dec = (): void => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/milk.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Amul Taaza Toned Fresh Milk</Text>
      <View style={styles.qty}>
        <View style={styles.qtyContainer}>
          <TouchableOpacity onPress={inc} style={styles.qtyButtons}>
            <Text style={styles.textShadow}>+</Text>
          </TouchableOpacity>
          <Text style={[styles.textShadow, styles.centeredText]}>
            {quantity}
          </Text>
          <TouchableOpacity
            onPress={dec}
            style={styles.qtyButtons}
            disabled={quantity === 0}>
            <Text style={styles.textShadow}>-</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.price}>₹ {price}</Text>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: height * 0.025,
    margin: height * 0.03,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 7,
  },
  image: {
    height: height * 0.1,
    padding: height * 0.01,
    margin: height * 0.01,
  },
  text: {
    width: width * 0.35,
    marginTop: height * 0.03,
  },
  qty: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: width * 0.15,
    alignItems: 'center',
    marginRight: width * 0.05,
    marginVertical: height * 0.03,
  },
  qtyContainer: {
    borderRadius: height * 0.02,
    flex: 1,
    flexDirection: 'row',
    marginVertical: 'auto',
    backgroundColor: 'rgba(230, 221, 255, 0.8)',
    width: '100%',
    justifyContent: 'space-between',
  },
  qtyButtons: {
    backgroundColor: 'transparent',
    color: '#000',
    alignSelf: 'center',
    paddingHorizontal: height * 0.01,
  },
  price: {
    fontWeight: 'bold',
    marginTop: height * 0.01,
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 1,
  },
  centeredText: {
    alignSelf: 'center',
  },
});
