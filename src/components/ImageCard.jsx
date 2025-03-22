import {useNavigation} from '@react-navigation/native';
import React, {Component, useState} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const ImageCard = ({item}) => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('WallPaperScreen', {item})}
      style={styles.container(item.color)}>
      <Image
        style={styles.coverImage}
        source={{
          uri: item.links.download,
        }}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => setLiked(!liked)}>
          <FontAwesome
            name={liked ? 'heart' : 'heart-o'}
            size={30}
            color={liked ? 'red' : 'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="download" size={30} color={'white'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: color => ({
    height: 300,
    width: '50%',
    backgroundColor: color,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 8,
    marginVertical: 10,
  }),
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
