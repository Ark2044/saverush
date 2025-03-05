import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../utils/Colors';

interface CurrentLocationButtonProps {
  onPress: () => void;
  buttonText?: string;
}

const CurrentLocationButton: React.FC<CurrentLocationButtonProps> = ({
  onPress,
  buttonText = 'Use Current Location',
}) => {
  return (
    <TouchableOpacity
      style={styles.currentLocationButton}
      onPress={onPress}
      activeOpacity={0.7}>
      <Icon
        name="location"
        size={22}
        color={COLORS.BACKGROUND_WHITE}
        style={styles.locationIcon}
      />
      <Text style={styles.currentLocationText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.ACCENT_GREEN,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignSelf: 'center',
    shadowColor: COLORS.ACCENT_GREEN,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  locationIcon: {
    marginRight: 10,
  },
  currentLocationText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.DARK_GRAY,
  },
});

export default CurrentLocationButton;
