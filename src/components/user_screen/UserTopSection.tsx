import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const UserTopSection = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleGoBack}
          style={styles.backButton}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileImageContainer}>
        <View style={styles.profileImageWrapper}>
          <Icon name="user-circle" size={90} color="white" />
        </View>
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profilePhoneNumber}>+1234567890</Text>
        <TouchableOpacity style={styles.profileButton} activeOpacity={0.8}>
          <Text style={styles.profileButtonText}>Save Rush Pro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.4,
    width: width,
    backgroundColor: '#542BC9',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    overflow: 'hidden', // Required for the blur effect
  },
  buttonContainer: {
    marginLeft: 20,
    marginTop: 10,
  },
  backButton: {
    padding: 8,
  },
  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageWrapper: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  profileName: {
    color: 'white',
    fontSize: 26,
    marginTop: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  profilePhoneNumber: {
    color: '#B3FF53',
    marginTop: 8,
    fontSize: 18,
    letterSpacing: 0.5,
  },
  profileButton: {
    backgroundColor: '#B3FF53',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 18,
    borderRadius: 25,
    width: width * 0.55,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 25,
  },
  profileButtonText: {
    fontSize: 16,
    color: '#542BC9',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

export default UserTopSection;
