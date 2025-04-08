import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackParams';
import { colors } from '../../utils/Colors';
import {useCart} from '../context/CartContext';
import {useUser} from '../context/UserContext';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;
type ProductDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProductDetails'
>;

const ProductDetailsScreen: React.FC = () => {
  const navigation = useNavigation<ProductDetailsNavigationProp>();
  const route = useRoute<ProductDetailsRouteProp>();
  const {productId, productName, productPrice, productImage} = route.params;
  const {dispatch: cartDispatch} = useCart();
  const {state: userState} = useUser();

  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = useCallback(async () => {
    if (!userState.isAuthenticated) {
      Alert.alert(
        'Authentication Required',
        'Please login to add items to cart',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Login',
            onPress: () => navigation.navigate('Login'),
          },
        ],
      );
      return;
    }

    setIsLoading(true);
    try {
      cartDispatch({
        type: 'ADD_ITEM',
        payload: {
          id: productId,
          name: productName,
          price: productPrice,
          quantity,
          image: productImage,
        },
      });

      Alert.alert('Success', 'Item added to cart', [
        {
          text: 'Continue Shopping',
          style: 'cancel',
        },
        {
          text: 'View Cart',
          onPress: () => navigation.navigate('ShoppingCart'),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add item to cart');
    } finally {
      setIsLoading(false);
    }
  }, [
    cartDispatch,
    navigation,
    productId,
    productName,
    productPrice,
    productImage,
    quantity,
    userState.isAuthenticated,
  ]);

  const updateQuantity = useCallback((change: number) => {
    setQuantity(prev => {
      const newQuantity = prev + change;
      return newQuantity < 1 ? 1 : newQuantity;
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{uri: productImage}} style={styles.productImage} />

        <View style={styles.contentContainer}>
          <Text style={styles.productName}>{productName}</Text>
          <Text style={styles.productPrice}>${productPrice.toFixed(2)}</Text>

          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(-1)}>
                <Icon name="remove" size={24} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(1)}>
                <Icon name="add" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>

          <View style={styles.specificationsContainer}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            <View style={styles.specificationItem}>
              <Text style={styles.specificationLabel}>Weight:</Text>
              <Text style={styles.specificationValue}>500g</Text>
            </View>
            <View style={styles.specificationItem}>
              <Text style={styles.specificationLabel}>Brand:</Text>
              <Text style={styles.specificationValue}>Generic</Text>
            </View>
            <View style={styles.specificationItem}>
              <Text style={styles.specificationLabel}>Category:</Text>
              <Text style={styles.specificationValue}>Groceries</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>
            ${(productPrice * quantity).toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Icon name="cart" size={24} color="#fff" />
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  productImage: {
    width: Dimensions.get('window').width,
    height: 300,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    color: colors.primary,
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 8,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 16,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  specificationsContainer: {
    marginBottom: 24,
  },
  specificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  specificationLabel: {
    fontSize: 16,
    color: '#666',
  },
  specificationValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  priceContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ProductDetailsScreen;
