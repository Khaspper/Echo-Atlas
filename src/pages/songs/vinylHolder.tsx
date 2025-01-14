import React, { useState, useEffect } from 'react';
import Vinyl from './vinyls';
import { fetchSimilarSongs } from '@/services/lastfm';
import { searchSong } from '@/services/spotify';
import axios from 'axios';

interface VinylHolderProps {
    songName: string;
    artistName: string;
    searchTriggered: boolean;
}

interface Song {
    name: string;
    photoUrl: string;
    spotifyUri?: string;
    artist?: string;
}

const VinylHolder: React.FC<VinylHolderProps> = ({ songName, artistName, searchTriggered }) => {
    const [songs, setSongs] = useState<Song[]>([]);

    useEffect(() => {
        if (!searchTriggered) return;

        const fetchSongs = async () => {
            try {
                let response;
                try {
                    response = await axios.get(`/api/get-song?title=${encodeURIComponent(songName)}&artistName=${encodeURIComponent(artistName)}`);
                } catch (error) {
                    if (axios.isAxiosError(error) && error.response?.status === 404) {
                        console.log('Song not found in database, searching via API...');
                        const song = await searchSong(songName, artistName);

                        const similarSongs = await fetchSimilarSongs(song.name, song.artist || artistName);

                        const fetchedSimilarSongs = await Promise.all(
                            similarSongs.map(async (similarSong: Song) => {
                                const fetchedSong = await searchSong(similarSong.name, similarSong.artist || artistName);
                                const formattedSong = {
                                    title: fetchedSong.name,
                                    artistName: fetchedSong.artist,
                                    photoUrl: fetchedSong.imageURL,
                                    spotifyUri: fetchedSong.uri
                                };
                                const savedSong = await axios.post('/api/save-song', formattedSong);
                                return savedSong.data.song._id;  // Only returning the ObjectId here
                            })
                        );

                        // Saving the searched song along with the similar songs using ObjectId references
                        const searchedSong = {
                            title: song.name,
                            artistName: song.artist,
                            photoUrl: song.imageURL,
                            spotifyUri: song.uri,
                            similarSongs: fetchedSimilarSongs.map(songId => ({ songId: songId }))  // ObjectId references only
                        };

                        await axios.post('/api/save-song', searchedSong);

                        setSongs(similarSongs.map((song: Song) => ({ name: song.name, photoUrl: song.photoUrl })));
                        return;
                    } else {
                        throw error;
                    }
                }

                if (response.data && response.data.length > 0) {
                    console.log('Song found in the database:', response.data);
                    setSongs(response.data.map((song: any) => ({ name: song.title, photoUrl: song.photoUrl })));
                    return;
                }

            } catch (error) {
                console.error('Error fetching similar songs or saving song:', error);
            }
        };

        fetchSongs();
    }, [songName, artistName, searchTriggered]);

    return (
        <div className="flex flex-wrap justify-center items-center w-full h-full border-2 border-gray-400 rounded-lg">
            {songs.map((song, index) => (
                <div key={index}>
                    <Vinyl songName={song.name} photoUrl={song.photoUrl} />
                </div>
            ))}
        </div>
    );
};

export default VinylHolder;