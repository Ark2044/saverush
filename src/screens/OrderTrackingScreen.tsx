import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootStackParams';
import {colors} from '../../utils/Colors';
import LottieView from 'lottie-react-native';

type OrderTrackingRouteProp = RouteProp<RootStackParamList, 'OrderTracking'>;

const OrderTrackingScreen: React.FC = () => {
  const route = useRoute<OrderTrackingRouteProp>();
  const {orderId, status} = route.params;
  const [estimatedTime, setEstimatedTime] = useState<string>('');

  useEffect(() => {
    // Simulate fetching estimated delivery time
    const timer = setTimeout(() => {
      setEstimatedTime('30-45 minutes');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.orderId}>Order #{orderId}</Text>
        {estimatedTime && (
          <Text style={styles.estimatedTime}>
            Estimated delivery: {estimatedTime}
          </Text>
        )}
      </View>

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  orderId: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  estimatedTime: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
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
});

export default OrderTrackingScreen;
