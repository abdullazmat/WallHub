/* eslint-disable no-shadow */
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const LikeComponent = () => {
  const navigation = useNavigation();
  const [wallpapers, setWallpapers] = useState([]);

  const getWallPapersFromAsysncStorage = async () => {
    let images = await AsyncStorage.getItem('images');
    images = images ? JSON.parse(images) : [];
    setWallpapers(images);
  };
  useFocusEffect(
    React.useCallback(() => {
      const getWallPapersFromAsyncStorage = async () => {
        let images = await AsyncStorage.getItem('images');
        images = images ? JSON.parse(images) : [];
        setWallpapers(images);
      };
      getWallPapersFromAsyncStorage();
    }, []),
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <TouchableOpacity
        style={styles.backIconContainer}
        onPress={() => navigation.navigate('HomeStack')}>
        <Ionicons name="chevron-back-outline" color={'white'} size={30} />
      </TouchableOpacity>
      <View>
        <Text style={styles.collectionHeading}>Favourities</Text>
        <Text style={styles.collectionText}>
          You have marked all of them as a favouritee.
        </Text>
      </View>
      <FlatList
        data={wallpapers}
        renderItem={({item, index}) => <ImageCard item={item} index={index} />}
        numColumns={2}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      />
    </View>
  );
};
const LikeScreen = () => {
  const isFocused = useIsFocused();
  return isFocused ? <LikeComponent /> : null;
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
export default LikeScreen;
