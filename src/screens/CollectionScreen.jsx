import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const CollectionScreen = () => {
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

export default CollectionScreen;
