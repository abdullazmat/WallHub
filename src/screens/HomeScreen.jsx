import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Header from '../components/Header';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: '#121928',
    flex: 1,
  },
});

export default HomeScreen;
