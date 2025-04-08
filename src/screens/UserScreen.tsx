import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import UserTopSection from '../components/user_screen/UserTopSection';
import UserBottomSection from '../components/user_screen/UserBottomSection';
import BottomTabBar from '../components/BottomTabBar';

const UserScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#E6DDFF" barStyle="dark-content" />
      <View style={styles.container}>
        <UserTopSection />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <UserBottomSection />
        </ScrollView>
        <BottomTabBar activeTab="user" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E6DDFF',
  },
  container: {
    backgroundColor: '#E6DDFFCC',
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 80 : 60, // Additional padding to account for BottomTabBar
  },
});

export default UserScreen;
