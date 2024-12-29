import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
// import ArtistGraph from '../../components/ArtistGraph';

const hardcodedData: Record<string, string[]> = {
  "Taylor Swift": ["Ed Sheeran", "Adele", "Sam Smith"],
  "Ed Sheeran": ["Taylor Swift", "Shawn Mendes", "Dua Lipa"],
  "Adele": ["Sam Smith", "John Legend", "Lady Gaga"],
};

export default function ArtistPage() {
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [relatedArtists, setRelatedArtists] = useState<string[]>([]);

  const handleArtistSearch = (artist: string) => {
    if (hardcodedData[artist]) {
      setSelectedArtist(artist);
      setRelatedArtists(hardcodedData[artist]);
    } else {
      setSelectedArtist(null); // Reset the state if the artist is invalid
      alert('Artist not found. Try another search.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header with Search Bar */}
      <div className="p-8 bg-white shadow-md flex items-center justify-evenly mt-5">
        {selectedArtist && (
          <h1 className="text-3xl font-bold">
            {selectedArtist}
          </h1>
        )}
        {!selectedArtist && <h1 className="text-3xl font-bold">Artist Explorer</h1>}
        <SearchBar placeholder="Enter artist name" onSearch={handleArtistSearch} />
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex">
        {/* Artist Graph Section */}
        {selectedArtist ? (
          <div className="flex-1 w-2/3 h-full">
            {/* <ArtistGraph artist={selectedArtist} relatedArtists={relatedArtists} /> */}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-gray-500 text-lg">
              Search for an artist to explore their connections!
            </p>
          </div>
        )}

        {/* Lorem Text Section */}
        {selectedArtist && (
          <div className="w-1/3 h-full bg-gray-50 p-4 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">More Information</h2>
            <p className="text-gray-600">
              People who like this Artist might also like these artists. 
              The closer two names are, the greater the probability people will like both artists.
              Click on any name to travel along.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
