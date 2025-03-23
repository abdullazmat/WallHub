import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDownloadFile} from '../hooks/useDownloadFile';
import {Text} from 'react-native-gesture-handler';

const ImageCard = ({item}) => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const {downloadFile, percentage, downloading} = useDownloadFile();

  // Load liked status from AsyncStorage when component mounts
  useFocusEffect(
    React.useCallback(() => {
      const loadLikedStatus = async () => {
        let likedWallpapers = await AsyncStorage.getItem('images');
        likedWallpapers = likedWallpapers ? JSON.parse(likedWallpapers) : [];
        const isLiked = likedWallpapers.some(image => image.id === item.id);
        setLiked(isLiked);
      };
      loadLikedStatus();
    }, [item.id]),
  );

  // Function to handle like/unlike
  const handleLikeWallpaper = async () => {
    let likedWallpapers = await AsyncStorage.getItem('images');
    likedWallpapers = likedWallpapers ? JSON.parse(likedWallpapers) : [];
    let isExist = likedWallpapers.findIndex(image => image.id === item.id);

    if (isExist < 0) {
      // Add to favorites
      const newItem = {...item, isLiked: true};
      likedWallpapers = [newItem, ...likedWallpapers];
      setLiked(true);
      Alert.alert(
        'Added to Favorites',
        'Your Wallpaper has been added to favorites',
        [
          {text: 'Dismiss', style: 'cancel'},
          {
            text: 'View Favorites',
            onPress: () => navigation.navigate('LikeStack'),
          },
        ],
      );
    } else {
      // Remove from favorites
      likedWallpapers.splice(isExist, 1);
      setLiked(false);
      Alert.alert(
        'Removed From Favorites',
        'Your Wallpaper has been removed from favorites',
        [{text: 'Dismiss', style: 'cancel'}],
      );
    }

    await AsyncStorage.setItem('images', JSON.stringify(likedWallpapers));
  };

  const handleDownloadWallpaper = () => {
    downloadFile(item.urls.raw, item.alt_description);
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('WallPaperScreen', {item})}
      style={styles.container(item.color)}>
      <Image style={styles.coverImage} source={{uri: item.urls.regular}} />
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleLikeWallpaper}>
          <FontAwesome
            name={liked ? 'heart' : 'heart-o'}
            size={30}
            color={liked ? 'red' : 'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDownloadWallpaper(item)}>
          <Feather name="download" size={30} color={'white'} />
        </TouchableOpacity>
      </View>
      {/* Show loader while downloading */}
      {downloading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={'white'} size={'large'} />
          <Text style={styles.LoaderText}>
            Progress Percentage {percentage}%
          </Text>
        </View>
      ) : null}
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
  loaderContainer: {
    ...StyleSheet.absoluteFillObject, // Covers entire screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  LoaderText: {
    color: 'white',
    paddingTop: 20,
  },
});

export default ImageCard;
