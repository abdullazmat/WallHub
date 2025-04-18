import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useDownloadFile} from '../hooks/useDownloadFile';
import Share from 'react-native-share';
import ReactNativeBlobUtil from 'react-native-blob-util';

const WallPaperScreen = () => {
  const {downloadFile, percentage, downloading} = useDownloadFile();
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params.item;
  console.log(item);
  const [liked, setLiked] = useState(false);

  // Load liked status from AsyncStorage when component mounts
  useFocusEffect(
    React.useCallback(() => {
      const loadLikedStatus = async () => {
        let likedWallpapers = await AsyncStorage.getItem('images');
        likedWallpapers = likedWallpapers ? JSON.parse(likedWallpapers) : [];
        const isLiked = likedWallpapers.some(image => image.id === item.id);
        setLiked(!isLiked);
      };
      loadLikedStatus();
    }, [item.id]),
  );

  const handleLikeWallpaper = async item => {
    let likedWallpapers = await AsyncStorage.getItem('images');
    likedWallpapers = likedWallpapers ? JSON.parse(likedWallpapers) : [];
    let isExist = likedWallpapers.findIndex(image => image.id === item.id);
    if (isExist < 0) {
      const newItem = {...item, isLiked: true};
      likedWallpapers = [newItem, ...likedWallpapers];
      setLiked(!liked);
      Alert.alert(
        'Added to Favorities',
        'Your Wallpaper has been added to favourities',
        [
          {
            text: 'Dismiss',
            style: 'cancel',
          },
          {
            text: 'View Favorites',
            onPress: () => {
              navigation.navigate('LikeStack');
            },
          },
        ],
      );
    } else {
      // Remove from favorites
      likedWallpapers.splice(isExist, 1);
      setLiked(!liked);
      Alert.alert(
        'Removed From Favorites',
        'Your Wallpaper has been removed from favorites',
        [{text: 'Dismiss', style: 'cancel'}],
      );
    }

    await AsyncStorage.setItem('images', JSON.stringify(likedWallpapers));
  };

  const handleDownloadWallpaper = async () => {
    await downloadFile(item.urls.raw, item.alt_description);
  };

  const handleShareWallpaper = () => {
    try {
      ReactNativeBlobUtil.fetch('GET', item.urls.regular).then(res => {
        let status = res.info().status;
        if (status === 200) {
          let base64Str = res.base64();
          let options = {
            url: `data:image/jpeg;base64,${base64Str}`,
          };
          Share.open(options)
            .then(r => {
              console.log(r);
            })
            .catch(e => {
              e && console.log(e);
            });
        } else {
          // handle other status codes
        }
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <StatusBar hidden />
      <ImageBackground
        style={styles.container}
        source={{uri: item.urls.regular}}
      />

      <TouchableOpacity
        style={styles.backIconContainer}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" color={'white'} size={30} />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            handleLikeWallpaper(item);
          }}>
          <FontAwesome
            name={!liked ? 'heart' : 'heart-o'}
            size={30}
            color={!liked ? 'red' : 'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDownloadWallpaper()}>
          <Feather name="download" size={30} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleShareWallpaper()}>
          <FontAwesome name="share" size={30} color={'white'} />
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121928',
    padding: 25,
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
  iconContainer: {
    position: 'absolute',
    bottom: 220,
    right: 20,
    height: 140,
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
export default WallPaperScreen;
