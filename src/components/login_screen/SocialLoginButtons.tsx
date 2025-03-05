import React from 'react';
import {View, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose another icon set if preferred

const SocialLoginButtons: React.FC = () => {
  return (
    <View style={styles.socialLoginContainer}>
      <TouchableOpacity
        style={styles.socialButton}
        accessible={true}
        accessibilityLabel="Login with Google">
        <Icon
          name="google"
          size={ICON_SIZE}
          color="#DB4437" // Google's brand color
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.socialButton}
        accessible={true}
        accessibilityLabel="Login with Facebook">
        <Icon
          name="facebook"
          size={ICON_SIZE}
          color="#3b5998" // Facebook's brand color
        />
      </TouchableOpacity>

      {Platform.OS === 'ios' && (
        <TouchableOpacity
          style={styles.socialButton}
          accessible={true}
          accessibilityLabel="Login with Apple">
          <Icon
            name="apple"
            size={ICON_SIZE}
            color="#000" // Apple's typical black icon
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const BUTTON_SIZE = 54;
const ICON_SIZE = 24;
const BORDER_RADIUS = BUTTON_SIZE / 2;

const styles = StyleSheet.create({
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  socialButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BORDER_RADIUS,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },
});

export default SocialLoginButtons;
