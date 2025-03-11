import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/RootStackParams';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type MenuItemScreen = Extract<
  keyof RootStackParamList,
  | 'OrdersScreen'
  | 'WalletScreen'
  | 'HelpCenterScreen'
  | 'AboutUsScreen'
  | 'ShippingOrdersScreen'
  | 'TermsScreen'
  | 'MyListScreen'
  | 'RequestProductScreen'
  | 'PaymentSettingScreen'
  | 'CouponScreen'
  | 'ContactUsScreen'
  | 'ShareAppScreen'
>;

type MenuItem = {
  icon: string;
  label: string;
  screen: MenuItemScreen;
};

const UserBottomSection = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const menuItems: MenuItem[] = [
    {icon: 'shopping-bag', label: 'Orders', screen: 'OrdersScreen'},
    {icon: 'credit-card', label: 'Wallet', screen: 'WalletScreen'},
    {icon: 'question-circle', label: 'Help Center', screen: 'HelpCenterScreen'},
    {icon: 'info-circle', label: 'About Us', screen: 'AboutUsScreen'},
    {icon: 'truck', label: 'Shipping Orders', screen: 'ShippingOrdersScreen'},
    {icon: 'file-text', label: 'Terms & Conditions', screen: 'TermsScreen'},
    {icon: 'heart', label: 'My List', screen: 'MyListScreen'},
    {
      icon: 'lightbulb-o',
      label: 'Request New Product',
      screen: 'RequestProductScreen',
    },
    {icon: 'cog', label: 'Payment Setting', screen: 'PaymentSettingScreen'},
    {icon: 'tag', label: 'Coupon Code', screen: 'CouponScreen'},
    {icon: 'phone', label: 'Contact Us', screen: 'ContactUsScreen'},
    {icon: 'share-alt', label: 'Share This App', screen: 'ShareAppScreen'},
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BlurView
        style={styles.blurBackground}
        blurType="light"
        blurAmount={10}
      />
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.listContainer}
          activeOpacity={0.7}
          onPress={() => navigation.navigate(item.screen)}>
          <View style={styles.iconContainer}>
            <Icon name={item.icon} size={22} color="#542BC9" />
          </View>
          <Text style={styles.listText}>{item.label}</Text>
          <View style={styles.arrowContainer}>
            <Icon name="angle-right" size={22} color="#542BC9" />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 30,
    position: 'relative',
  },
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 6,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F0EAFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  arrowContainer: {
    width: 30,
    alignItems: 'flex-end',
  },
});

export default UserBottomSection;
