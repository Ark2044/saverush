import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../utils/Colors';

// Import SVGs as components (ensure you have configured metro.config.js properly)
import VeggiesSvg from '../assets/images/categories/veggies.svg';
import ChipsSvg from '../assets/images/categories/chips.svg';
import BakerySvg from '../assets/images/categories/bakery.svg';
import ChocolatesSvg from '../assets/images/categories/chocolates.svg';
import DalsSvg from '../assets/images/categories/dals.svg';
import FrozenSvg from '../assets/images/categories/frozen.svg';

// Example categories data using SVG components
const CATEGORIES = [
  {
    id: 1,
    title: 'Vegetables & Fruits',
    Svg: VeggiesSvg,
  },
  {
    id: 2,
    title: 'Chips & Namkeen',
    Svg: ChipsSvg,
  },
  {
    id: 3,
    title: 'Bakery & Dairy',
    Svg: BakerySvg,
  },
  {
    id: 4,
    title: 'Chocolates & Ice cream',
    Svg: ChocolatesSvg,
  },
  {
    id: 5,
    title: 'Atta, Rice & Dals',
    Svg: DalsSvg,
  },
  {
    id: 6,
    title: 'Instant & Frozen Food',
    Svg: FrozenSvg,
  },
];

const Home = () => {
  const renderCategoryItem = (item: {
    id: number;
    title: string;
    Svg: React.FC<{width?: number; height?: number}>;
  }) => {
    const SvgComponent = item.Svg;
    return (
      <TouchableOpacity key={item.id} style={styles.categoryCard}>
        <SvgComponent width={50} height={50} />
        <Text style={styles.categoryText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          {/* Delivery info */}
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryTime}>Delivery in 10 mins</Text>
            <Text style={styles.deliveryLocation}>Gateway of India</Text>
          </View>
          {/* User Icon */}
          <TouchableOpacity>
            <Icon name="person-circle-outline" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Icon
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for 'chips'"
            placeholderTextColor="#999"
          />
          <Icon
            name="mic-outline"
            size={20}
            color="#999"
            style={styles.micIcon}
          />
        </View>

        {/* Main Content */}
        <ScrollView
          style={styles.mainContent}
          showsVerticalScrollIndicator={false}>
          {/* Categories Section */}
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesContainer}>
            {CATEGORIES.map(renderCategoryItem)}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_WHITE,
  },
  screen: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  // HEADER
  headerContainer: {
    backgroundColor: COLORS.PRIMARY_PURPLE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  deliveryInfo: {
    flexDirection: 'column',
  },
  deliveryTime: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  deliveryLocation: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '400',
  },
  // SEARCH BAR
  searchBarContainer: {
    position: 'absolute',
    top: 130,
    left: 16,
    right: 16,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 40,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  micIcon: {
    marginLeft: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#333',
  },
  // MAIN CONTENT
  mainContent: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.DARK_GRAY,
    marginBottom: 16,
  },
  // CATEGORIES
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GRAY,
  },
  categoryImage: {
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: COLORS.DARK_GRAY,
    textAlign: 'center',
  },
});

export default Home;
