import React, { useState } from 'react';
import VinylPlayer from './vinylBase';
import VinylHolder from './vinylHolder';

const HomePage = () => {
    const [songName, setSongName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [searchTriggered, setSearchTriggered] = useState(false);

    const handleSongChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSongName(event.target.value);
    };

    const handleArtistChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setArtistName(event.target.value);
    };

    const handleSearch = () => {
        setSearchTriggered(true);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-4">Welcome to the Vinyl Page</h1>

            {/* Search Bar for Song and Artist with Button */}
            <div className="flex justify-center mt-4 space-x-4">
                <input
                    type="text"
                    placeholder="Enter song name..."
                    value={songName}
                    onChange={handleSongChange}
                    onKeyPress={handleKeyPress}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Enter artist name..."
                    value={artistName}
                    onChange={handleArtistChange}
                    onKeyPress={handleKeyPress}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Search
                </button>
            </div>

            <div className="flex justify-center items-center h-screen w-screen">
                {/* Vinyl Holder always shows but updates only when search is pressed */}
                <VinylHolder songName={searchTriggered ? songName.trim() : ''} artistName={searchTriggered ? artistName.trim() : ''} />
                <VinylPlayer />
            </div>
        </div>
    );
};

export default HomePage;
