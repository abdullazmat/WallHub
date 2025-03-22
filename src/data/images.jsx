import axios from 'axios';

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const CLIENT_ID = '7Ka_RWtcNEfG6TbhyhOVxcpe_oQUcLyv4ONn0eqFhV0';

export const fetchWallpapers = async (page = 1, query = 'wallpapers') => {
  try {
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

    return response.data.results;
  } catch (error) {
    return [];
  }
};
