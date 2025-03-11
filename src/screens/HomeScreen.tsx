import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import HomeTopSection from '../components/home_screen/HomeTopSection';
import CategoryItemContainer from '../components/home_screen/CategoryItemContainer';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#542BC9" barStyle="light-content" />
      <HomeTopSection />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}>
        {/* Category section is already handled by CategoryItemContainer */}
        <CategoryItemContainer />

        {/* You can add more sections here */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>
              Featured products will appear here
            </Text>
          </View>
        </View>

        <View style={styles.dealsSection}>
          <Text style={styles.sectionTitle}>Today's Deals</Text>
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>
              Deal items will appear here
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  featuredSection: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  dealsSection: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  placeholderContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 20,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888888',
    fontSize: 14,
  },
});

export default HomeScreen;
