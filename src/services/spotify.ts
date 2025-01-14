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

const ensureToken = async (): Promise<void> => {
  if (!accessToken || (tokenExpiry && Date.now() > tokenExpiry)) {
    await fetchAccessToken();
  }
};

/**
 * Search for an artist by name, fetch details including their image and top 3 tracks.
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

    // Fetch top tracks for the artist and only return uri
    const topTracksResponse = await axios.get(`${SPOTIFY_API_BASE_URL}/artists/${artist.id}/top-tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        market: 'US',
      },
    });

    const topTracks = topTracksResponse.data.tracks.slice(0, 3).map((track: any) => ({
      name: track.name,
      uri: track.uri, // Only saving the URI instead of the full object
    }));

    return {
      id: artist.id,
      name: artist.name,
      imageURL: artist.images[0]?.url || '',
      topTracks, // Now returning only name and URI
    };
  } catch (error: any) {
    console.error(`Failed to fetch artist details: ${error.message}`);
    throw error;
  }
};

/**
 * Search for a song given the song name and the artist's name using the Spotify API.
 * @param songName Name of the song to search for
 * @param artistName Name of the artist to search for
 */
export const searchSong = async (songName: string, artistName: string) => {
  await ensureToken();

  try {
    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: `${songName} artist:${artistName}`,
        type: 'track',
        limit: 1,
      },
    });

    if (response.data.tracks.items.length === 0) {
      throw new Error(`No song found for: ${songName} by ${artistName}`);
    }

    const song = response.data.tracks.items[0];

    return {
      name: song.name,
      uri: song.uri,
      album: song.album.name,
      artist: song.artists.map((artist: any) => artist.name).join(', '),
      imageURL: song.album.images[0]?.url || '',
    };
  } catch (error: any) {
    console.error(`Failed to fetch song details: ${error.message}`);
    throw error;
  }
};
