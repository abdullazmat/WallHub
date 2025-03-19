import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const LikeScreen = () => {
  return (
    <View style={styles.container}>
      <Text> textInComponent </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
});

export default LikeScreen;
