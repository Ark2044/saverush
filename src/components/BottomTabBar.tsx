import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../../navigation/RootStackParams';

const {width} = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type TabBarProps = {
  activeTab: 'home' | 'cart' | 'profile';
};

const BottomTabBar: React.FC<TabBarProps> = ({activeTab}) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() =>
          navigation.navigate('Home', {selectedLocation: 'Your Location'})
        }>
        <Icon
          name="home"
          size={24}
          color={activeTab === 'home' ? '#542BC9' : '#777'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.navigate('ShoppingCart')}>
        <Icon
          name="cart"
          size={24}
          color={activeTab === 'cart' ? '#542BC9' : '#777'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.navigate('User')}>
        <Icon
          name="person"
          size={24}
          color={activeTab === 'profile' ? '#542BC9' : '#777'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 16 : 0,
    width: width,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTabBar;
