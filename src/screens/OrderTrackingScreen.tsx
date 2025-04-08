import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackParams';
import {colors} from '../../utils/Colors';
import LottieView from 'lottie-react-native';
import {useOrder} from '../context/OrderContext';
import Icon from 'react-native-vector-icons/Ionicons';

type OrderTrackingRouteProp = RouteProp<RootStackParamList, 'OrderTracking'>;
type OrderTrackingNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OrderTracking'
>;

const OrderTrackingScreen: React.FC = () => {
  const route = useRoute<OrderTrackingRouteProp>();
  const navigation = useNavigation<OrderTrackingNavigationProp>();
  const {orderId, status: initialStatus} = route.params;
  const {state: orderState, dispatch: orderDispatch} = useOrder();
  const [status, setStatus] = useState(initialStatus);
  const [estimatedTime, setEstimatedTime] = useState<string>('');

  useEffect(() => {
    // Simulate order status updates
    const statusUpdates = [
      {status: 'confirmed', delay: 5000},
      {status: 'preparing', delay: 10000},
      {status: 'out_for_delivery', delay: 15000},
      {status: 'delivered', delay: 20000},
    ];

    let currentIndex = 0;
    const timers: NodeJS.Timeout[] = [];

    const updateStatus = () => {
      if (currentIndex < statusUpdates.length) {
        const {status: newStatus, delay} = statusUpdates[currentIndex];
        const timer = setTimeout(() => {
          setStatus(newStatus);
          orderDispatch({
            type: 'UPDATE_ORDER_STATUS',
            payload: {orderId, status: newStatus},
          });
          currentIndex++;
          updateStatus();
        }, delay);
        timers.push(timer);
      }
    };

    updateStatus();

    // Set initial estimated time
    setEstimatedTime('30-45 minutes');

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [orderDispatch, orderId]);

  const getStatusDetails = () => {
    switch (status) {
      case 'pending':
        return {
          title: 'Order Received',
          description: 'Your order has been received and is being processed',
          animation: require('../assets/lottie/order-received.json'),
        };
      case 'confirmed':
        return {
          title: 'Order Confirmed',
          description: 'Your order has been confirmed and is being prepared',
          animation: require('../assets/lottie/order-confirmed.json'),
        };
      case 'preparing':
        return {
          title: 'Preparing Your Order',
          description: 'Our team is preparing your items with care',
          animation: require('../assets/lottie/preparing-order.json'),
        };
      case 'out_for_delivery':
        return {
          title: 'Out for Delivery',
          description: 'Your order is on its way to you',
          animation: require('../assets/lottie/delivery.json'),
        };
      case 'delivered':
        return {
          title: 'Order Delivered',
          description: 'Your order has been successfully delivered',
          animation: require('../assets/lottie/order-delivered.json'),
        };
      default:
        return {
          title: 'Order Status',
          description: 'Tracking your order',
          animation: require('../assets/lottie/loading.json'),
        };
    }
  };

  const statusDetails = getStatusDetails();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.orderId}>Order #{orderId}</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}>
        {estimatedTime && (
          <Text style={styles.estimatedTime}>
            Estimated delivery: {estimatedTime}
          </Text>
        )}

        <View style={styles.statusContainer}>
          <LottieView
            source={statusDetails.animation}
            autoPlay
            loop={status !== 'delivered'}
            style={styles.animation}
          />
          <Text style={styles.statusTitle}>{statusDetails.title}</Text>
          <Text style={styles.statusDescription}>
            {statusDetails.description}
          </Text>
        </View>

        <View style={styles.timelineContainer}>
          <View style={styles.timeline}>
            <View
              style={[
                styles.timelineItem,
                status === 'pending' && styles.activeTimelineItem,
              ]}>
              <View style={styles.timelineDot} />
              <Text style={styles.timelineText}>Order Received</Text>
            </View>

            <View
              style={[
                styles.timelineItem,
                status === 'confirmed' && styles.activeTimelineItem,
              ]}>
              <View style={styles.timelineDot} />
              <Text style={styles.timelineText}>Order Confirmed</Text>
            </View>

            <View
              style={[
                styles.timelineItem,
                status === 'preparing' && styles.activeTimelineItem,
              ]}>
              <View style={styles.timelineDot} />
              <Text style={styles.timelineText}>Preparing</Text>
            </View>

            <View
              style={[
                styles.timelineItem,
                status === 'out_for_delivery' && styles.activeTimelineItem,
              ]}>
              <View style={styles.timelineDot} />
              <Text style={styles.timelineText}>Out for Delivery</Text>
            </View>

            <View
              style={[
                styles.timelineItem,
                status === 'delivered' && styles.activeTimelineItem,
              ]}>
              <View style={styles.timelineDot} />
              <Text style={styles.timelineText}>Delivered</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {status === 'delivered' && (
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  orderId: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  estimatedTime: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  animation: {
    width: 200,
    height: 200,
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  statusDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  timelineContainer: {
    marginTop: 32,
  },
  timeline: {
    paddingLeft: 24,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    opacity: 0.5,
  },
  activeTimelineItem: {
    opacity: 1,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    marginRight: 16,
  },
  timelineText: {
    fontSize: 16,
    color: '#333',
  },
  homeButton: {
    backgroundColor: colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderTrackingScreen;
