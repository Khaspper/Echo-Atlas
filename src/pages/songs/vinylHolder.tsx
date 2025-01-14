import React, { useState, useEffect } from 'react';
import Vinyl from './vinyls';

interface VinylHolderProps {
    songName: string;
    artistName: string;
}

const VinylHolder: React.FC<VinylHolderProps> = ({ songName, artistName }) => {
    const [songs, setSongs] = useState<{ songName: string; photoUrl: string }[]>([]);

    useEffect(() => {
        if (songName && artistName) {
            // Simulate fetching data
            setSongs([{ songName, photoUrl: 'https://via.placeholder.com/150' }]);
        }
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
