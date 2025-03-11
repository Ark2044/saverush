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
};
