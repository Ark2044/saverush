import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../utils/Colors';

interface SavedLocationsProps {
  locations: string[];
  onSelectLocation: (location: string) => void;
}

const SavedLocations: React.FC<SavedLocationsProps> = ({
  locations,
  onSelectLocation,
}) => {
  return (
    <View style={styles.container}>
      {locations.map((location, index) => (
        <TouchableOpacity
          key={index}
          style={styles.locationItem}
          onPress={() => onSelectLocation(location)}>
          <Icon
            name="home"
            size={20}
            color={COLORS.PRIMARY_PURPLE}
            style={styles.icon}
          />
          <Text style={styles.locationText}>{location}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  locationText: {
    fontSize: 16,
    color: COLORS.DARK_GRAY,
    fontWeight: '500',
  },
});

export default memo(SavedLocations);
