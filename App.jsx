import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {StatusBar} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const App = () => {
  return (
    <View style={styles.contianer}>
      <StatusBar barStyle="dark-content" />
      <Text>Helo</Text>
      <AntDesign name={'right'} size={40} />
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: {
    paddingTop: 40,
    paddingStart: 30,
  },
});

export default App;
