import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const CLIENT_ID = '7Ka_RWtcNEfG6TbhyhOVxcpe_oQUcLyv4ONn0eqFhV0';

export const fetchWallpapers = async (page = 1, query = 'wallpapers') => {
  try {
    // Fetch liked images from AsyncStorage
    let likedWallpapers = await AsyncStorage.getItem('images');
    likedWallpapers = likedWallpapers ? JSON.parse(likedWallpapers) : [];

    // Fetch new images from Unsplash API
    const response = await axios.get(UNSPLASH_API_URL, {
      params: {
        query,
        per_page: 20,
        page,
      },
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`,
      },
    });

    let apiResults = response?.data?.results || [];

    // Filter out images that are already liked
    const unlikedWallpapers = apiResults.filter(
      image => !likedWallpapers.some(liked => liked.id === image.id),
    );

    return unlikedWallpapers; // Return only unliked images
  } catch (error) {
    console.log('Error fetching wallpapers:', error);
    return [];
  }
};
