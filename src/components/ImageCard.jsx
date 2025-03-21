import {useNavigation} from '@react-navigation/native';
import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const ImageCard = ({item}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('WallPaperScreen', {item})}
      style={styles.container}>
      <Image
        style={styles.coverImage}
        source={{
          uri: item.image,
        }}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <AntDesign name="hearto" size={30} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="download" size={30} color={'white'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '50%',
    backgroundColor: 'pink',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 8,
    marginVertical: 10,
  },
  coverImage: {
    flex: 1,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    height: 80,
    justifyContent: 'space-between',
  },
});
export default ImageCard;
