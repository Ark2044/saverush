import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemContainer from '../components/order_again_screen/ItemContainer';

const dimensions = Dimensions.get('window');

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Order Again</Text>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>Restock your Essentials</Text>
      </View>
      <View>
        <ItemContainer />
        <ItemContainer />
      </View>

      <View style={styles.buttonContainer}>
        <Text style={styles.totalText}>1 item - $10.00</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Go to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: dimensions.height,
    width: dimensions.width,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#542BC9',
    paddingVertical: 30,
  },
  backButton: {
    borderRadius: 10,
    marginLeft: 10,
  },
  title: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  subHeader: {
    zIndex: 100,
    marginTop: 20,
    padding: 30,
    borderWidth: 1,
    borderColor: 'lightgray',
    shadowColor: 'lightgray',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    borderBottomWidth: 5,
  },
  subHeaderText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#542BC9',
    margin: 20,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  totalText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'semibold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 50,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'semibold',
    textAlign: 'center',
  },
});

export default App;
