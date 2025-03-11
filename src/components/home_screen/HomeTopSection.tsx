import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../../navigation/RootStackParams';

const dimensions = Dimensions.get('window');
const HomeTopSection = () => {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.locationContainer}>
            <TouchableOpacity onPress={() => {}} style={styles.locationIcon}>
              <Icon name="map-marker" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.locationText}>123 Main St, Anytown, USA</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileContainer}>
            <TouchableOpacity
              onPress={() => {
                nav.navigate('User');
              }}
              style={styles.profileIcon}>
              <Icon name="user-circle" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Icon
              name="search"
              size={18}
              color="#777"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for 'chips'"
              placeholderTextColor="#777"
            />
            <TouchableOpacity
              onPress={() => {}}
              style={styles.micIconContainer}>
              <Icon name="microphone" size={18} color="#777" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: dimensions.height / 4,
    width: dimensions.width,
    backgroundColor: '#542BC9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 8,
  },
  locationText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  profileContainer: {
    alignItems: 'flex-end',
  },
  profileIcon: {
    padding: 4,
  },
  searchContainer: {
    marginTop: 20,
    width: '100%',
  },
  searchInputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 48,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#000',
  },
  micIconContainer: {
    padding: 5,
  },
});

export default HomeTopSection;
