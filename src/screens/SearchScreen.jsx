import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {fetchWallpapers} from '../data/images';
import ImageCard from '../components/ImageCard';
import {useDebouncedCallback} from 'use-debounce';

const SearchScreen = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const imagesRef = useRef([]);
  const [query, setQuery] = useState('wallpapers');
  const [filteredImages, setFilteredImages] = useState([images]);

  useEffect(() => {
    loadImages(1, query);
  }, [query]);

  // Delay
  const debounced = useDebouncedCallback(query => {
    setQuery(query);
  }, 500);

  const loadImages = async (newPage = 1, query) => {
    const newImages = await fetchWallpapers(newPage, query);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.searchHeader}>
          <Text style={styles.collectionHeading}>Search </Text>
          <TouchableOpacity style={styles.backIconContainer}>
            <Entypo name="cross" color={'white'} size={30} />
          </TouchableOpacity>
        </View>
        <Text style={styles.collectionText}>
          Search through infinite number of Wallpapers.
        </Text>
        <View style={styles.inputContainer}>
          <AntDesign name="search1" color="white" size={20} />
          <TextInput
            placeholder="Search here"
            placeholderTextColor={'white'}
            style={styles.inputText}
            focusable={true}
            onChangeText={text => debounced(text)}
          />
        </View>
        <FlatList
          data={images}
          renderItem={({item, index}) => (
            <ImageCard item={item} index={index} />
          )}
          numColumns={2}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}
          onEndReached={loadMore} // Load more when scrolling down
          onEndReachedThreshold={0.5} // Adjust threshold for better experience
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingStart: 20,
    paddingEnd: 20,
    backgroundColor: '#121928',
    flex: 1,
  },
  searchHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backIconContainer: {
    height: 40,
    width: 40,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#6d68c4',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  inputText: {
    flex: 1,
    paddingHorizontal: 15,
    color: 'white',
  },
});
export default SearchScreen;
