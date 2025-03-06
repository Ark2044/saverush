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
};
