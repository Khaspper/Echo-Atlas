import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

// Cache the token for reuse
let accessToken: string | null = null;
let tokenExpiry: number | null = null;

/**
 * Fetch a new access token from Spotify API.
 */
const fetchAccessToken = async (): Promise<void> => {
  const authString = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

  const response = await axios.post(SPOTIFY_AUTH_URL, 'grant_type=client_credentials', {
    headers: {
      Authorization: `Basic ${authString}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  accessToken = response.data.access_token;
  tokenExpiry = Date.now() + response.data.expires_in * 1000; // Calculate token expiry time
};

/**
 * Ensure that we have a valid token before making API requests.
 */
const ensureToken = async (): Promise<void> => {
  if (!accessToken || (tokenExpiry && Date.now() > tokenExpiry)) {
    await fetchAccessToken();
  }
};

/**
 * Search for an artist by name and fetch details including their image.
 * @param artistName Name of the artist to search for
 */
export const fetchArtistDetails = async (artistName: string) => {
  await ensureToken();

  try {
    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: artistName,
        type: 'artist',
        limit: 1,
      },
    });

    if (response.data.artists.items.length === 0) {
      throw new Error(`No artist found for name: ${artistName}`);
    }

    const artist = response.data.artists.items[0];
    return {
      id: artist.id,
      name: artist.name,
      imageURL: artist.images[0]?.url || '', // Default to empty if no image
    };
  } catch (error: any) {
    console.error(`Failed to fetch artist details: ${error.message}`);
    throw error;
  }
};

/**
 * Fetch detailed information about an artist by their Spotify ID.
 * @param artistId Spotify ID of the artist
 */
export const fetchArtistById = async (artistId: string) => {
  await ensureToken();

  try {
    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const artist = response.data;
    return {
      id: artist.id,
      name: artist.name,
      imageURL: artist.images[0]?.url || '',
      genres: artist.genres,
      followers: artist.followers.total,
    };
  } catch (error: any) {
    console.error(`Failed to fetch artist by ID: ${error.message}`);
    throw error;
  }
};
