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
                    if (response.data && response.data.length > 0) {
                        const fetchedSongs = response.data.map((song: any) => ({ name: song.title, photoUrl: song.photoUrl }));
                        setSongs(fetchedSongs);

                        await Promise.all(response.data.map(async (song: any) => {
                            if (song.similarSongs.length === 0) {
                                console.log('similar Songs array is empty');
                                const songsFromLastFm = await fetchSimilarSongs(song.title, song.artistName);
                            
                                const updatedSimilarSongs = await Promise.all(
                                    songsFromLastFm.map(async (similarSong: Song) => {
                                        try {
                                            const fetchedSong = await searchSong(similarSong.name, similarSong.artist || song.artistName);
                                            const formattedSong = {
                                                title: fetchedSong.name,
                                                artistName: fetchedSong.artist,
                                                photoUrl: fetchedSong.imageURL,
                                                spotifyUri: fetchedSong.uri,
                                                similarSongs: [],
                                            };
                                            await axios.post('/api/save-song', formattedSong);
                                            return formattedSong;
                                        } catch (error) {
                                            console.error(`Error fetching details for ${similarSong.name}:`, error);
                                            return {
                                                songId: null,
                                                colorPalette: null
                                            };
                                        }
                                    })
                                );
                            
                                const searchedSong = {
                                    title: song.title,
                                    artistName: song.artistName,
                                    photoUrl: song.photoUrl,
                                    spotifyUri: song.spotifyUri,
                                    similarSongs: updatedSimilarSongs.filter(song => song.songId !== null)
                                };
                            
                                await axios.post('/api/save-song', searchedSong);
                            
                                setSongs(updatedSimilarSongs.map((song) => ({ name: song.name, photoUrl: song.photoUrl })));
                                return;
                            }
                            
                        }));
                    }
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
                                    spotifyUri: fetchedSong.uri,
                                    similarSongs: [],
                                };
                                const savedSong = await axios.post('/api/save-song', formattedSong);
                                return savedSong.data.song._id;
                            })
                        );

                        const searchedSong = {
                            title: song.name,
                            artistName: song.artist,
                            photoUrl: song.imageURL,
                            spotifyUri: song.uri,
                            similarSongs: fetchedSimilarSongs.map(songId => ({ songId }))
                        };

                        console.log("searchedSong: ", searchedSong)
                        await axios.post('/api/save-song', searchedSong);

                        setSongs(similarSongs.map((song: Song) => ({ name: song.name, photoUrl: song.photoUrl })));
                        return;
                    } else {
                        throw error;
                    }
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
