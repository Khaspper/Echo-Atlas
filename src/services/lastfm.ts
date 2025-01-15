import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY!;
const BASE_URL = 'http://ws.audioscrobbler.com/2.0/';

// Define the type for an artist from the Last.fm API
interface LastFmArtist {
    name: string;
    image: { '#text': string }[];
    match?: string;
}

// Define the type for a formatted artist
interface FormattedArtist {
    name: string;
    photoUrl: string;
    similarityScore: number;
}

// Fetch Related Artists with Proper Typing
export const fetchRelatedArtists = async (artistName: string): Promise<FormattedArtist[]> => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                method: 'artist.getsimilar',
                artist: artistName,
                api_key: API_KEY,
                format: 'json',
                limit: 30, //! Number of artists to fetch
            },
        });

        const similarArtists: LastFmArtist[] = response.data?.similarartists?.artist || [];

        const formattedArtists: FormattedArtist[] = similarArtists.map((artist: LastFmArtist) => ({
            name: artist.name,
            photoUrl: artist.image?.[2]?.['#text'] || 'https://via.placeholder.com/60?text=Artist', // Use medium-sized image
            similarityScore: parseFloat(artist.match || '0'),
        }));

        // Randomize the array using Fisher-Yates Shuffle :P
        //! I did this because lastfms API returns the similarity score in order and when
        //! I put it on the screen it looks like a spiral
        for (let i = formattedArtists.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [formattedArtists[i], formattedArtists[j]] = [formattedArtists[j], formattedArtists[i]];
        }

        return formattedArtists;
    } catch (error) {
        console.error('Error fetching related artists:', error);
        throw new Error('Failed to fetch related artists');
    }
};

// Define types for the similar songs response
interface LastFmTrack {
    name: string;
    artist: { name: string };
    image: { '#text': string }[];
    match?: string;
}

// Fetch Similar Songs with Proper Typing
export const fetchSimilarSongs = async (
    trackName: string,
    artistName: string
): Promise<FormattedArtist[]> => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                method: 'track.getsimilar',
                track: trackName,
                artist: artistName,
                api_key: API_KEY,
                format: 'json',
                limit: 2,
            },
        });

        const similarTracks: LastFmTrack[] = response.data?.similartracks?.track || [];

        const formattedTracks: FormattedArtist[] = similarTracks.map((track: LastFmTrack) => ({
            name: track.name,
            photoUrl: track.image?.[2]?.['#text'] || 'https://via.placeholder.com/60?text=Track',
            similarityScore: parseFloat(track.match || '0'),
        }));

        return formattedTracks;
    } catch (error) {
        console.error('Error fetching similar songs:', error);
        throw new Error('Failed to fetch similar songs');
    }
};
