import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import {FlatList} from 'react-native-gesture-handler';
import data from '../data/categories.json';

const CollectionScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.collectionHeading}> Collections </Text>
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <CategoryCard item={item} index={index} />
        )}
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121928',
    padding: 20,
  },
  collectionHeading: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
});

export default CollectionScreen;
