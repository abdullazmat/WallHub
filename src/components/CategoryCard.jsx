import {useNavigation} from '@react-navigation/native';
import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Image} from 'react-native';

const CategoryCard = ({item}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CollectionWallpaperScreen', {item})
        }>
        <Image
          style={styles.coverImage}
          source={{
            uri: item.image,
          }}
        />
        <View style={styles.overlay}>
          <View style={styles.OverlayTextContainer}>
            <Text style={styles.OverlayText}>{item.name} Wallpapers</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginVertical: 10, borderRadius: 20, overflow: 'hidden'},
  coverImage: {
    height: 100,
    width: '100%',
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
  },
  OverlayTextContainer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
  },
  OverlayText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 700,
  },
});

export default CategoryCard;
