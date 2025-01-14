import React, { useState, useEffect } from 'react';
import Vinyl from './vinyls';
import { searchSong } from '@/services/spotify';

interface VinylHolderProps {
    songName: string;
    artistName: string;
}

const VinylHolder: React.FC<VinylHolderProps> = ({ songName, artistName }) => {
    const [songs, setSongs] = useState<{ songName: string; photoUrl: string }[]>([]);

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const song = await searchSong(songName, artistName);
                console.log('Fetched Song:', song);
                // setSongs([{ songName: song.name, photoUrl: song.photoUrl }]);
            } catch (error) {
                console.error('Error fetching song:', error);
            }
        };

        fetchSong();
    }, [songName, artistName]);

    return (
        <div className="flex flex-wrap justify-center items-center w-full h-full border-2 border-gray-400 rounded-lg">
            {songs.map((song, index) => (
                <div key={index}>
                    <Vinyl songName={song.songName} photoUrl={song.photoUrl} />
                </div>
            ))}
        </div>
    );
};

export default VinylHolder;
