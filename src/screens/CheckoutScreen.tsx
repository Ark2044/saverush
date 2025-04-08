import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackParams';
import { colors } from '../../utils/Colors';
import {useCart} from '../context/CartContext';
import {useOrder} from '../context/OrderContext';
import {useUser} from '../context/UserContext';

type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Checkout'
>;
type CheckoutScreenRouteProp = RouteProp<RootStackParamList, 'Checkout'>;

const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation<CheckoutScreenNavigationProp>();
  const route = useRoute<CheckoutScreenRouteProp>();
  const {cartItems, total} = route.params;
  const {dispatch: cartDispatch} = useCart();
  const {dispatch: orderDispatch} = useOrder();
  const {state: userState} = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const handlePayment = useCallback(async () => {
    setIsLoading(true);
    try {
      // Generate a unique order ID
      const orderId = `ORD-${Date.now()}`;

      // Create the order
      const order = {
        id: orderId,
        items: cartItems,
        total,
        status: 'pending' as const,
        deliveryAddress:
          userState.user?.addresses.find(
            addr => addr.id === userState.user?.defaultAddressId,
          )?.street || '',
        paymentMethod,
        createdAt: new Date().toISOString(),
      };

      // Dispatch the order
      orderDispatch({type: 'CREATE_ORDER', payload: order});

      // Clear the cart
      cartDispatch({type: 'CLEAR_CART'});

      Alert.alert(
        'Order Placed Successfully',
        'Your order has been placed successfully!',
        [
          {
            text: 'Track Order',
            onPress: () =>
              navigation.navigate('OrderTracking', {
                orderId,
                status: 'pending',
              }),
          },
        ],
      );
    } catch (error) {
      Alert.alert(
        'Payment Failed',
        'Please try again or use a different payment method',
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    cartDispatch,
    cartItems,
    navigation,
    orderDispatch,
    paymentMethod,
    total,
    userState.user?.addresses,
    userState.user?.defaultAddressId,
  ]);

  const renderPaymentMethod = (
    method: 'card' | 'cash',
    icon: string,
    label: string,
  ) => (
    <TouchableOpacity
      style={[
        styles.paymentMethod,
        paymentMethod === method && styles.selectedPaymentMethod,
      ]}
      onPress={() => setPaymentMethod(method)}>
      <Icon
        name={icon}
        size={24}
        color={paymentMethod === method ? colors.primary : '#666'}
      />
      <Text
        style={[
          styles.paymentMethodText,
          paymentMethod === method && styles.selectedPaymentMethodText,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Checkout</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentMethods}>
            {renderPaymentMethod('card', 'card-outline', 'Credit/Debit Card')}
            {renderPaymentMethod('cash', 'cash-outline', 'Cash on Delivery')}
          </View>
        </View>

        {paymentMethod === 'card' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Card Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              keyboardType="numeric"
              value={cardDetails.number}
              onChangeText={text =>
                setCardDetails({...cardDetails, number: text})
              }
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChangeText={text =>
                  setCardDetails({...cardDetails, expiry: text})
                }
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="CVV"
                keyboardType="numeric"
                value={cardDetails.cvv}
                onChangeText={text =>
                  setCardDetails({...cardDetails, cvv: text})
                }
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Cardholder Name"
              value={cardDetails.name}
              onChangeText={text =>
                setCardDetails({...cardDetails, name: text})
              }
            />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>$2.99</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>${(total * 0.1).toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryItem, styles.totalItem]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              ${(total + 2.99 + total * 0.1).toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.payButton}
        onPress={handlePayment}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.payButtonText}>
            {paymentMethod === 'card' ? 'Pay Now' : 'Place Order'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: colors.primary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentMethod: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 4,
  },
  selectedPaymentMethod: {
    backgroundColor: '#e6f0ff',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  paymentMethodText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  selectedPaymentMethodText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalItem: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  payButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primary,
    padding: 16,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
