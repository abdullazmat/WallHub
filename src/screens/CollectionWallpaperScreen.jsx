/* eslint-disable no-shadow */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {Component, useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageCard from '../components/ImageCard';
import {fetchWallpapers} from '../data/images';

const CollectionWallpaperScreen = () => {
  const route = useRoute();
  const item = route.params.item;
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const imagesRef = useRef([]);

  const loadImages = async (newPage = 1) => {
    const newImages = await fetchWallpapers(newPage, item.name);

    if (newPage === 1) {
      imagesRef.current = newImages; // First page
    } else {
      imagesRef.current = [...imagesRef.current, ...newImages]; // Append new images
    }

    setImages(imagesRef.current);
  };

  useEffect(() => {
    fetchWallpapers();
  }, []);

  const loadMore = () => {
    setPage(prevPage => {
      const nextPage = prevPage + 1;
      loadImages(nextPage);
      return nextPage;
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <TouchableOpacity
        style={styles.backIconContainer}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" color={'white'} size={30} />
      </TouchableOpacity>
      <View>
        <Text style={styles.collectionHeading}>{item.name}</Text>
        <Text style={styles.collectionText}>
          Unlimited listed Wallpapers for {item.name} Collection.
        </Text>
      </View>
      <FlatList
        data={images}
        renderItem={({item, index}) => <ImageCard item={item} index={index} />}
        numColumns={2}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
        onEndReached={loadMore} // Load more when scrolling down
        onEndReachedThreshold={0.5} // Adjust threshold for better experience
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingStart: 20,
    backgroundColor: '#121928',
    flex: 1,
  },
  backIconContainer: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#414753',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collectionHeading: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  collectionText: {
    paddingTop: 15,
    paddingBottom: 20,
    color: 'white',
    fontSize: 15,
  },
});
export default CollectionWallpaperScreen;
