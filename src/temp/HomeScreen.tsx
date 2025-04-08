import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackParams';
import {useCart} from '../context/CartContext';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

// Categories data
const categories = [
  {
    id: '1',
    name: 'Vegetables & Fruits',
    image: require('../assets/images/categories/vegetables_and_fruits.png'),
  },
  {
    id: '2',
    name: 'Chips & Namkeen',
    image: require('../assets/images/categories/chips_and_namkeen.png'),
  },
  {
    id: '3',
    name: 'Bakery & Dairy',
    image: require('../assets/images/categories/bakery_and_dairy.png'),
  },
  {
    id: '4',
    name: 'Chocolates & Ice cream',
    image: require('../assets/images/categories/chocolates_and_icecream.png'),
  },
  {
    id: '5',
    name: 'Atta, Rice & Dals',
    image: require('../assets/images/categories/atta_rice_dal.png'),
  },
  {
    id: '6',
    name: 'Instant & Frozen Food',
    image: require('../assets/images/categories/instant_frozen_food.png'),
  },
];

// Meal options data
const mealOptions = [
  {
    id: '1',
    name: 'Pizza',
    image: require('../assets/images/meal_options/pizza.png'),
  },
  {
    id: '2',
    name: 'Burger',
    image: require('../assets/images/meal_options/burger.png'),
  },
  {
    id: '3',
    name: 'Pasta',
    image: require('../assets/images/meal_options/pasta.png'),
  },
];

// Pizza ingredients data
const pizzaIngredients = [
  {
    id: '1',
    name: 'Amul Cheese',
    weight: '60g',
    price: 58,
    image: require('../assets/images/ingredients/cheese.png'),
  },
  {
    id: '2',
    name: 'Pizza Sauce',
    weight: '250g',
    price: 90,
    image: require('../assets/images/ingredients/sauce.png'),
  },
  {
    id: '3',
    name: 'Pizza Base',
    weight: '200g',
    price: 40,
    image: require('../assets/images/ingredients/base.png'),
  },
];

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {state: cartState} = useCart();

  const handleCategoryPress = (category: (typeof categories)[0]) => {
    navigation.navigate('SubView', {
      category: category.name,
    });
  };

  return (
    <>
      <StatusBar backgroundColor="#542BC9" barStyle="light-content" />
      <SafeAreaView style={styles.topSafeArea} />
      <SafeAreaView style={styles.bottomSafeArea}>
        {/* Purple Header */}
        <View style={styles.header}>
          <View style={styles.deliveryInfo}>
            <View style={styles.locationRow}>
              <MaterialIcons name="delivery-dining" size={24} color="white" />
              <Text style={styles.deliveryText}>Delivery in 10 mins</Text>
            </View>
            <Text style={styles.deliverySubText}>Delivery in First</Text>
          </View>
          <TouchableOpacity style={styles.profileIcon}>
            <Icon name="person" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for 'chips'"
            />
            <TouchableOpacity style={styles.searchIcon}>
              <Icon name="search" size={20} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.micIcon}>
              <Icon name="mic" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}>
          {/* Categories Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.categoriesGrid}>
              {categories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryCard}
                  onPress={() => handleCategoryPress(category)}>
                  <Image source={category.image} style={styles.categoryImage} />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Make your meal Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Make your meal</Text>
            <View style={styles.mealOptionsContainer}>
              {mealOptions.map(option => (
                <TouchableOpacity key={option.id} style={styles.mealOptionCard}>
                  <Image source={option.image} style={styles.mealOptionImage} />
                  <Text style={styles.mealOptionName}>{option.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Pizza Section */}
            <View style={styles.pizzaSection}>
              <Text style={styles.pizzaTitle}>PIZZA</Text>
              <Image
                source={require('../assets/images/meal_options/pizza_large.png')}
                style={styles.largePizzaImage}
              />

              <View style={styles.ingredientsContainer}>
                {pizzaIngredients.map(ingredient => (
                  <View key={ingredient.id} style={styles.ingredientCard}>
                    <Image
                      source={ingredient.image}
                      style={styles.ingredientImage}
                    />
                    <Text
                      style={styles.ingredientName}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {ingredient.name}
                    </Text>
                    <Text style={styles.ingredientWeight}>
                      {ingredient.weight}
                    </Text>
                    <Text style={styles.ingredientPrice}>
                      ₹{ingredient.price}
                    </Text>
                    <View style={styles.quantityControl}>
                      <TouchableOpacity style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>1</Text>
                      <TouchableOpacity style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.addToCartButton}>
                      <Text style={styles.addToCartText}>Add to cart</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Icon name="home" size={24} color="#542BC9" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('ShoppingCart')}>
            <Icon name="cart" size={24} color="#777" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Icon name="person" size={24} color="#777" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: '#542BC9',
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: '#F8E8EA',
  },
  header: {
    backgroundColor: '#542BC9',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 16 : 0,
  },
  deliveryInfo: {
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  deliverySubText: {
    color: 'white',
    marginLeft: 32,
    fontSize: 12,
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: '#542BC9',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingLeft: 8,
  },
  searchIcon: {
    padding: 8,
  },
  micIcon: {
    padding: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 80,
  },
  sectionContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 48) / 3,
    backgroundColor: '#E6DDFFCC',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  categoryName: {
    textAlign: 'center',
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
    height: 30,
  },
  mealOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  mealOptionCard: {
    width: (width - 64) / 3,
    alignItems: 'center',
  },
  mealOptionImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  mealOptionName: {
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
    fontSize: 12,
  },
  pizzaSection: {
    alignItems: 'center',
    marginTop: 8,
  },
  pizzaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  largePizzaImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
    width: '100%',
  },
  ingredientCard: {
    width: (width - 48) / 3,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  ingredientImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  ingredientName: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
    width: '100%',
  },
  ingredientWeight: {
    fontSize: 10,
    color: 'gray',
  },
  ingredientPrice: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  quantityButton: {
    backgroundColor: '#F0F0F0',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  quantityButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 12,
  },
  addToCartButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginTop: 4,
  },
  addToCartText: {
    fontSize: 9,
  },
  bottomNav: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    height: 50,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 16 : 0,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
