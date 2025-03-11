import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

const CATEGORIES = [
  {
    id: 1,
    title: 'Vegetables & Fruits',
    image: require('../../assets/images/categories/vegetables_and_fruits.png'),
  },
  {
    id: 2,
    title: 'Chips & Namkeen',
    image: require('../../assets/images/categories/chips_and_namkeen.png'),
  },
  {
    id: 3,
    title: 'Bakery & Dairy',
    image: require('../../assets/images/categories/bakery_and_dairy.png'),
  },
  {
    id: 4,
    title: 'Chocolates & Ice cream',
    image: require('../../assets/images/categories/chocolates_and_icecream.png'),
  },
  {
    id: 5,
    title: 'Atta, Rice & Dals',
    image: require('../../assets/images/categories/atta_rice_dal.png'),
  },
  {
    id: 6,
    title: 'Instant & Frozen Food',
    image: require('../../assets/images/categories/instant_frozen_food.png'),
  },
];

const CategoryItemContainer = () => {
  const {width} = useWindowDimensions();

  // Calculate card width dynamically based on current window width.
  const cardWidth = (width - 50) / 3;

  // Create responsive styles based on the window width.
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginVertical: 15,
        },
        sectionTitle: {
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 12,
          marginLeft: 15,
        },
        scrollContent: {
          paddingHorizontal: 10,
        },
        categoriesContainer: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          width: width - 20,
          gap: 10,
        },
        categoryCard: {
          width: cardWidth,
          height: 110,
          backgroundColor: '#E6DDFFCC',
          borderRadius: 12,
          alignItems: 'center',
          padding: 10,
          marginBottom: 10,
        },
        iconContainer: {
          marginBottom: 8,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        },
        categoryText: {
          fontSize: 12,
          fontWeight: '600',
          textAlign: 'center',
          lineHeight: 16,
        },
        image: {
          width: 70,
          height: 70,
        },
      }),
    [width, cardWidth],
  );

  const renderCategoryItem = (item: {
    id: number;
    title: string;
    image: any;
  }) => (
    <TouchableOpacity key={item.id} style={styles.categoryCard}>
      <View style={styles.iconContainer}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.categoryText} numberOfLines={2} ellipsizeMode="tail">
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.categoriesContainer}>
          {CATEGORIES.map(renderCategoryItem)}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryItemContainer;
