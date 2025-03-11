import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('window');

interface CommonNavbarProps {
  text: string;
}

const CommonNavbar: React.FC<CommonNavbarProps> = ({text}) => {
  return (
    <View style={styles.container}>
      <Icon
        name="chevron-left"
        color="white"
        size={height * 0.014}
        style={styles.left}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default CommonNavbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width,
    height: height * 0.1,
    backgroundColor: 'rgba(84, 43, 201, 1)',
    padding: 20,
  },
  text: {
    paddingVertical: height * 0.005,
    color: 'white',
    fontWeight: 'bold',
    fontSize: height * 0.014,
    alignSelf: 'center',
  },
  left: {
    paddingVertical: height * 0.02,
    marginRight: height * 0.05,
    alignSelf: 'center',
  },
});
