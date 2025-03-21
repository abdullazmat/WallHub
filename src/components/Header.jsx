import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const Header = () => {
  return (
    <View style={styles.container}>
      <Feather name="menu" color="white" size={30} />
      <Image style={styles.appLogo} source={require('../assets/logo.png')} />
      <Feather name="bell" color="white" size={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  appLogo: {
    height: 60,
    width: 60,
  },
});

export default Header;
