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

const dimensions = Dimensions.get('window');

const PaymentAndAddressScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Payment & Address</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.addressContainer}>
          <Text style={styles.addressHeader}>Home</Text>
          <Text style={styles.addressText}>123 Main St, Anytown, USA</Text>
          <TouchableOpacity style={styles.editAddress}>
            <Text style={styles.editText}>Edit Address</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addAddress}>
          <Text style={styles.editText}>Add New Address</Text>
        </TouchableOpacity>
        <View style={styles.paymentContainer}>
          <Text style={styles.paymentText}>Payment Method</Text>
          <TouchableOpacity style={styles.paymentMethod}>
            <Text style={styles.paymentMethodText}>Credit Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentMethod}>
            <Text style={styles.paymentMethodText}>UPI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentMethod}>
            <Text style={styles.paymentMethodText}>Net Banking</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.paymentButton}>
          <Text style={styles.paymentButtonText}>Add New Payment Method</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>$10.00</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.buttonText}>
              Grand Total
              <Icon
                name="arrow-down"
                size={10}
                color="white"
                style={styles.iconPadding}
              />
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.button2Text}>Confirm Order</Text>
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
  content: {
    flex: 1,
    padding: 20,
  },
  addressContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    borderBottomWidth: 3,
    borderColor: 'lightgray',
    padding: 10,
    backgroundColor: '#F5F5F5D1',
  },
  addressHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  addressText: {
    fontSize: 14,
    fontWeight: 'normal',
    paddingBottom: 10,
  },
  editAddress: {
    backgroundColor: '#542BC9',
    borderRadius: 50,
    width: 100,
    alignSelf: 'flex-end',
    padding: 5,
  },
  addAddress: {
    marginTop: 10,
    backgroundColor: '#542BC9',
    borderRadius: 50,
    padding: 10,
    alignSelf: 'center',
    width: 200,
    marginBottom: 20,
  },
  editText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  paymentContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    borderBottomWidth: 3,
    borderColor: 'lightgray',
    padding: 10,
    backgroundColor: '#E6DDFFCC',
  },
  paymentText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
    backgroundColor: '#E6DDFFCC',
    borderRadius: 10,
    borderBottomWidth: 3,
    borderColor: 'gray',
    marginBottom: 10,
  },
  paymentMethodText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  paymentButton: {
    backgroundColor: '#542BC9',
    borderRadius: 50,
    padding: 10,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#542BC9',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 20,
  },
  totalContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#542BC9',
  },
  totalText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#B3FF53',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  button2Text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconPadding: {
    paddingLeft: 5,
  },
});

export default PaymentAndAddressScreen;
