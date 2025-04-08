import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackParams';
import {colors} from '../../utils/Colors';
import {useCart} from '../context/CartContext';
import {useUser} from '../context/UserContext';
import BottomTabBar from '../components/BottomTabBar';

type CartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ShoppingCart'
>;

const CartScreen: React.FC = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const {state: cartState, dispatch: cartDispatch} = useCart();
  const {state: userState} = useUser();

  const handleRemoveItem = useCallback(
    (itemId: string) => {
      cartDispatch({type: 'REMOVE_ITEM', payload: itemId});
    },
    [cartDispatch],
  );

  const handleUpdateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      cartDispatch({
        type: 'UPDATE_QUANTITY',
        payload: {id: itemId, quantity},
      });
    },
    [cartDispatch],
  );

  const handleCheckout = useCallback(() => {
    if (!userState.isAuthenticated) {
      Alert.alert(
        'Authentication Required',
        'Please login to proceed with checkout',
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

    if (!userState.user?.defaultAddressId) {
      Alert.alert(
        'Address Required',
        'Please add a delivery address before checkout',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Add Address',
            onPress: () => navigation.navigate('AddressDetails'),
          },
        ],
      );
      return;
    }

    navigation.navigate('Checkout', {
      cartItems: cartState.items,
      total: cartState.total,
    });
  }, [
    cartState.items,
    cartState.total,
    navigation,
    userState.isAuthenticated,
    userState.user?.defaultAddressId,
  ]);

  if (cartState.items.length === 0) {
    return (
      <>
        <StatusBar backgroundColor="#542BC9" barStyle="light-content" />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.emptyContainer}>
            <Icon name="cart-outline" size={64} color={colors.primary} />
            <Text style={styles.emptyText}>Your cart is empty</Text>
            <TouchableOpacity
              style={styles.continueShoppingButton}
              onPress={() =>
                navigation.navigate('Home', {selectedLocation: 'Your Location'})
              }>
              <Text style={styles.continueShoppingText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
          <BottomTabBar activeTab="cart" />
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <StatusBar backgroundColor="#542BC9" barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Icon name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>My Cart</Text>
            <View style={styles.headerRight} />
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            {cartState.items.map(item => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={{uri: item.image}} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }>
                      <Icon name="remove" size={20} color={colors.primary} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }>
                      <Icon name="add" size={20} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(item.id)}>
                  <Icon name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={styles.bottomBar}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalPrice}>
                ${cartState.total.toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>

          <BottomTabBar activeTab="cart" />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    padding: 8,
  },
  headerRight: {
    width: 40,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 160, // Extra space for bottom bar and tab bar
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  continueShoppingButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueShoppingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: colors.primary,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 4,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 12,
  },
  removeButton: {
    padding: 8,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 60, // Leave space for the tab bar
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalContainer: {
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
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
