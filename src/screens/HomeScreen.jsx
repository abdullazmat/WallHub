import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Header from '../components/Header';
import ImageCard from '../components/ImageCard';
import {fetchWallpapers} from '../data/images';

const HomeScreen = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const imagesRef = useRef([]); // Store fetched images persistently

  const loadImages = async (newPage = 1) => {
    const newImages = await fetchWallpapers(newPage);
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
      <Header />
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
    padding: 25,
    backgroundColor: '#121928',
    flex: 1,
  },
});

export default HomeScreen;
