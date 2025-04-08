import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../../navigation/RootStackParams';
import {useCart} from '../context/CartContext';

type SubViewRouteProp = {
  params: {
    category: string;
  };
};

const {width, height} = Dimensions.get('window');

// Mock data for dairy products
const dairyProducts = [
  {
    id: '1',
    name: 'Amul Taaza Toned Fresh Milk',
    volume: '500ml',
    price: 28,
    image: require('../assets/images/products/milk.png'),
  },
  {
    id: '2',
    name: 'Amul Taaza Toned Fresh Milk',
    volume: '500ml',
    price: 28,
    image: require('../assets/images/products/milk.png'),
  },
];

const SubView: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<SubViewRouteProp>();
  const {dispatch} = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({
    '1': 1,
  });
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  const category = route.params?.category || 'Dairy, Bread & Eggs';

  const incrementQuantity = (productId: string) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const decrementQuantity = (productId: string) => {
    if ((quantities[productId] || 0) > 0) {
      setQuantities(prev => ({
        ...prev,
        [productId]: prev[productId] - 1,
      }));
    }
  };

  const addToCart = (product: any) => {
    // Add to local cart state
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    };

    setCartItems([...cartItems, newItem]);
    setCartTotal(cartTotal + product.price);

    // Add to global cart context
    dispatch({
      type: 'ADD_ITEM',
      payload: newItem,
    });
  };

  const goToCart = () => {
    navigation.navigate('ShoppingCart');
  };

  return (
    <>
      <StatusBar backgroundColor="#542BC9" barStyle="light-content" />
      <SafeAreaView style={styles.topSafeArea} />
      <SafeAreaView style={styles.bottomSafeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{category}</Text>
        </View>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.productsContainer}>
            {/* First product row */}
            <View style={styles.productRow}>
              {/* First Product */}
              <View style={styles.productCard}>
                <View style={styles.productImageContainer}>
                  <Image
                    source={dairyProducts[0].image}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={styles.productTitle}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {dairyProducts[0].name}
                </Text>
                <Text style={styles.productVolume}>
                  {dairyProducts[0].volume}
                </Text>
                <Text style={styles.productPrice}>
                  ₹{dairyProducts[0].price}
                </Text>
                <View style={styles.quantitySelector}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => incrementQuantity(dairyProducts[0].id)}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>
                    {quantities[dairyProducts[0].id] || 1}
                  </Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => decrementQuantity(dairyProducts[0].id)}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Second Product */}
              <View style={styles.productCard}>
                <View style={styles.productImageContainer}>
                  <Image
                    source={dairyProducts[1].image}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={styles.productTitle}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {dairyProducts[1].name}
                </Text>
                <Text style={styles.productVolume}>
                  {dairyProducts[1].volume}
                </Text>
                <Text style={styles.productPrice}>
                  ₹{dairyProducts[1].price}
                </Text>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => addToCart(dairyProducts[1])}>
                  <Text style={styles.addToCartText}>Add to cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Cart Summary */}
        <View style={styles.bottomContainer}>
          {cartItems.length > 0 ? (
            <View style={styles.cartSummary}>
              <Text style={styles.cartSummaryText}>
                {cartItems.length} item{cartItems.length > 1 ? 's' : ''} | ₹
                {cartTotal}
              </Text>
              <TouchableOpacity
                style={styles.goToCartButton}
                onPress={goToCart}>
                <Text style={styles.goToCartText}>Go to Cart</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.cartSummary, styles.emptySummary]}
              onPress={() => addToCart(dairyProducts[0])}>
              <Text style={styles.cartSummaryText}>1 item | ₹28</Text>
              <View style={styles.goToCartButton}>
                <Text style={styles.goToCartText}>Go to Cart</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Bottom Navigation Categories */}
          <View style={styles.bottomNavigation}>
            <TouchableOpacity style={styles.navCategory}>
              <View style={styles.navCategoryImageContainer}>
                <Image
                  source={require('../assets/images/products/milk.png')}
                  style={styles.navCategoryImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.navCategoryText}>Milk</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navCategory}>
              <View style={styles.navCategoryImageContainer}>
                <Image
                  source={require('../assets/images/products/eggs.png')}
                  style={styles.navCategoryImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.navCategoryText}>Eggs</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navCategory}>
              <View style={styles.navCategoryImageContainer}>
                <Image
                  source={require('../assets/images/products/dahi.png')}
                  style={styles.navCategoryImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.navCategoryText}>Dahi</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Tab Bar */}
          <View style={styles.tabBar}>
            <TouchableOpacity style={styles.tabItem}>
              <Icon name="home" size={24} color="#777" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}>
              <Icon name="cart" size={24} color="#777" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}>
              <Icon name="refresh" size={24} color="#777" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: '#542BC9',
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: '#F8E8EA',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8E8EA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#542BC9',
    paddingVertical: 12,
    paddingHorizontal: 12,
    paddingTop: Platform.OS === 'android' ? 16 : 0,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 16,
  },
  productsContainer: {
    padding: 16,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    width: (width - 40) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
  },
  productImageContainer: {
    backgroundColor: '#E6DDFFCC',
    width: '100%',
    height: 90,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  productImage: {
    width: '80%',
    height: '80%',
  },
  productTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    height: 32,
  },
  productVolume: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  quantityButton: {
    paddingHorizontal: 10,
  },
  quantityButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 14,
    marginHorizontal: 8,
  },
  addToCartButton: {
    backgroundColor: '#E6DDFFCC',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  addToCartText: {
    fontSize: 12,
    fontWeight: '500',
  },
  bottomContainer: {
    width: '100%',
  },
  cartSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#542BC9',
    borderRadius: 28,
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  emptySummary: {
    opacity: 0.9,
  },
  cartSummaryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  goToCartButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  goToCartText: {
    color: '#333',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  },
  navCategory: {
    alignItems: 'center',
    width: width / 4,
  },
  navCategoryImageContainer: {
    backgroundColor: '#E6DDFFCC',
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  navCategoryImage: {
    width: '60%',
    height: '60%',
  },
  navCategoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 50,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: Platform.OS === 'ios' ? 16 : 0,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SubView;
