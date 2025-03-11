import React, {memo} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../utils/Colors';

interface LocationSearchBarProps {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  editable?: boolean;
  autoFocus?: boolean;
}

const LocationSearchBar: React.FC<LocationSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  editable = true,
  autoFocus = false,
}) => {
  return (
    <View style={styles.searchContainer}>
      <Icon
        name="search"
        size={20}
        color={COLORS.SOFT_GRAY}
        style={styles.searchIcon}
      />
      <TextInput
        placeholder="Search your delivery address"
        placeholderTextColor={COLORS.SOFT_GRAY}
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
        editable={editable}
        autoFocus={autoFocus}
      />
      {searchQuery ? (
        <TouchableOpacity onPress={() => setSearchQuery('')}>
          <Icon name="close-circle" size={20} color={COLORS.SOFT_GRAY} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.DARK_GRAY,
  },
});

export default memo(LocationSearchBar);
