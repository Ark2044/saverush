export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Otp: {phoneNumber: string; countryCode: string};
  Location: undefined;
  SearchAddress: {
    savedLocations: string[];
    currentRegion: {
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    };
  };
  AddressDetails: {
    selectedLocation: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  Home: {
    selectedLocation: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  User: undefined;
  // Added screens for UserBottomSection navigation
  OrdersScreen: undefined;
  WalletScreen: undefined;
  HelpCenterScreen: undefined;
  AboutUsScreen: undefined;
  ShippingOrdersScreen: undefined;
  TermsScreen: undefined;
  MyListScreen: undefined;
  RequestProductScreen: undefined;
  PaymentSettingScreen: undefined;
  CouponScreen: undefined;
  ContactUsScreen: undefined;
  ShareAppScreen: undefined;
  // New screens for product and checkout flow
  ProductSearch: undefined;
  ProductDetails: {
    productId: string;
    productName: string;
    productPrice: number;
    productImage: string;
  };
  SubView: {
    category: string;
  };
  ShoppingCart: undefined;
  Checkout: {
    cartItems: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
      image: string;
    }>;
    total: number;
  };
  OrderTracking: {
    orderId: string;
    status:
      | 'pending'
      | 'confirmed'
      | 'preparing'
      | 'out_for_delivery'
      | 'delivered';
  };
  Orders: undefined;
  Wallet: undefined;
  Profile: undefined;
  Settings: undefined;
};
