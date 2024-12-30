import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
// import ArtistGraph from '../../components/ArtistGraph';

const hardcodedData: Record<
  string,
  { name: string; similarityScore: number }[]
> = {
  "Taylor Swift": [
    { name: "Ed Sheeran", similarityScore: 0.9 },
    { name: "Adele", similarityScore: 0.8 },
    { name: "Sam Smith", similarityScore: 0.7 },
  ],
  "Ed Sheeran": [
    { name: "Taylor Swift", similarityScore: 0.9 },
    { name: "Shawn Mendes", similarityScore: 0.85 },
    { name: "Dua Lipa", similarityScore: 0.75 },
  ],
  "a": [
    { name: "Sam Smith", similarityScore: 0.95 },
    { name: "John Legend", similarityScore: 0.8 },
    { name: "Lady Gaga", similarityScore: 0.7 },
    { name: "Ariana Grande", similarityScore: 0.92 },
    { name: "Bruno Mars", similarityScore: 0.67 },
    { name: "Beyoncé", similarityScore: 0.85 },
    { name: "Rihanna", similarityScore: 0.54 },
    { name: "Katy Perry", similarityScore: 0.88 },
    { name: "Ed Sheeran", similarityScore: 0.76 },
    { name: "Shawn Mendes", similarityScore: 0.93 },
    { name: "Dua Lipa", similarityScore: 0.62 },
    { name: "The Weeknd", similarityScore: 0.81 },
    { name: "Sia", similarityScore: 0.58 },
    { name: "Justin Timberlake", similarityScore: 0.97 },
    { name: "Pink", similarityScore: 0.64 },
    { name: "Kelly Clarkson", similarityScore: 0.89 },
    { name: "Ellie Goulding", similarityScore: 0.73 },
    { name: "Miley Cyrus", similarityScore: 0.77 },
    { name: "Camila Cabello", similarityScore: 0.71 },
    { name: "Halsey", similarityScore: 0.59 },
    { name: "Zayn", similarityScore: 0.82 },
    { name: "Troye Sivan", similarityScore: 0.61 },
  ],
};

export default function ArtistPage() {
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [relatedArtists, setRelatedArtists] = useState<
    { name: string; similarityScore: number }[]
  >([]);

  const handleArtistSearch = (artist: string) => {
    if (hardcodedData[artist]) {
      setSelectedArtist(artist);
      setRelatedArtists(hardcodedData[artist]);
    } else {
      setSelectedArtist(null);
      setRelatedArtists([]);
      alert("Artist not found. Try another search.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header with Search Bar */}
      <div className="p-8 bg-white shadow-md flex items-center justify-evenly">
        {selectedArtist ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold">{selectedArtist}</h1>
            <div className="flex flex-col">
              <p className="text-gray-600">
                People who like {selectedArtist} might also like these artists.
                The closer two names are, the greater the probability people will like both artists.
              </p>
              <p className="text-gray-600">
                Click on any name to travel along.
              </p>
            </div>
          </div>
        ) : (
          <h1 className="text-3xl font-bold">Artist Explorer</h1>
        )}
        <SearchBar placeholder="Enter artist name" onSearch={handleArtistSearch} />
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex h-full">
        {/* Artist Graph Section */}
        {/* <ArtistGraph
          selectedArtist={selectedArtist || ''}
          relatedArtists={
            selectedArtist
              ? relatedArtists.map((artist) => ({
                  name: artist.name,
                  photoUrl: "https://via.placeholder.com/100",
                  similarityScore: artist.similarityScore,
                }))
              : []
          }
        /> */}
      </div>
    </div>
  );
}
