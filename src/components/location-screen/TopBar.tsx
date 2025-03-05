import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../utils/Colors';

interface TopBarProps {
  title: string;
  onBackPress: () => void;
}

const TopBar: React.FC<TopBarProps> = ({title, onBackPress}) => {
  return (
    <LinearGradient
      colors={[COLORS.PRIMARY_PURPLE, '#6A42D4']}
      style={styles.topBar}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Icon name="arrow-back" size={24} color={COLORS.BACKGROUND_WHITE} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.placeholderView} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  topBar: {
    height: 60,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: COLORS.BACKGROUND_WHITE,
    fontSize: 18,
    fontWeight: '600',
  },
  placeholderView: {
    width: 24,
  },
});

export default TopBar;
