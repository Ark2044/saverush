import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import UserTopSection from '../components/user_screen/UserTopSection';
import UserBottomSection from '../components/user_screen/UserBottomSection';

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
    paddingBottom: 20, // Add some padding at the bottom
  },
});

export default UserScreen;
