import React from 'react';
import {Text, StyleSheet, View, FlatList, Image} from 'react-native';
import Header from '../components/Header';
import ImageCard from '../components/ImageCard';
import data from '../data/images.json';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={data}
        renderItem={({item, index}) => <ImageCard item={item} index={index} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#121928',
    flex: 1,
  },
});

export default HomeScreen;
