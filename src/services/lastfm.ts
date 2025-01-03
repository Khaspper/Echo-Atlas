import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY!;
const BASE_URL = 'http://ws.audioscrobbler.com/2.0/';

export const fetchRelatedArtists = async (artistName: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        method: 'artist.getsimilar',
        artist: artistName,
        api_key: API_KEY,
        format: 'json',
        limit: 10, // Fetch only top 20 similar artists
      },
    });

    const similarArtists = response.data?.similarartists?.artist || [];
    let formattedArtists = similarArtists.map((artist: any) => ({
      name: artist.name,
      photoUrl: artist.image?.[2]?.['#text'] || 'https://via.placeholder.com/60?text=Artist', // Use medium-sized image
      similarityScore: parseFloat(artist.match || 0), // Optional, depends on Last.fm's response
    }));

    // Randomize the array using Fisher-Yates Shuffle
    for (let i = formattedArtists.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [formattedArtists[i], formattedArtists[j]] = [formattedArtists[j], formattedArtists[i]];
    }

    // Log the randomized array
    console.log('Randomized related artists:', formattedArtists);

    return formattedArtists;
  } catch (error) {
    console.error('Error fetching related artists:', error);
    throw new Error('Failed to fetch related artists');
  }
};
