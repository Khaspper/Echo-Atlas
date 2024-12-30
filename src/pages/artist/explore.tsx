import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import ArtistGraph from '../../components/ArtistGraph';

const hardcodedData: Record<
  string,
  { name: string; similarityScore: number; photoUrl: string }[]
> = {
  "Taylor Swift": [
    {
      name: "Ed Sheeran",
      similarityScore: 0.9,
      photoUrl: "https://via.placeholder.com/60?text=Ed+Sheeran",
    },
    {
      name: "Adele",
      similarityScore: 0.8,
      photoUrl: "https://via.placeholder.com/60?text=Adele",
    },
    {
      name: "Sam Smith",
      similarityScore: 0.7,
      photoUrl: "https://via.placeholder.com/60?text=Sam+Smith",
    },
  ],
  "Ed Sheeran": [
    {
      name: "Taylor Swift",
      similarityScore: 0.9,
      photoUrl: "https://via.placeholder.com/60?text=Taylor+Swift",
    },
    {
      name: "Shawn Mendes",
      similarityScore: 0.85,
      photoUrl: "https://via.placeholder.com/60?text=Shawn+Mendes",
    },
    {
      name: "Dua Lipa",
      similarityScore: 0.75,
      photoUrl: "https://via.placeholder.com/60?text=Dua+Lipa",
    },
  ],
  "a": [
    {
      name: "Sam Smith",
      similarityScore: 0.95,
      photoUrl: "https://via.placeholder.com/60?text=a",
    },
    {
      name: "John Legend",
      similarityScore: 0.8,
      photoUrl: "https://via.placeholder.com/60?text=John+Legend",
    },
    {
      name: "Lady Gaga",
      similarityScore: 0.7,
      photoUrl: "https://via.placeholder.com/60?text=Lady+Gaga",
    },
    {
      name: "Ariana Grande",
      similarityScore: 0.92,
      photoUrl: "https://via.placeholder.com/60?text=Ariana+Grande",
    },
    {
      name: "Bruno Mars",
      similarityScore: 0.67,
      photoUrl: "https://via.placeholder.com/60?text=Bruno+Mars",
    },
    {
      name: "Beyoncé",
      similarityScore: 0.85,
      photoUrl: "https://via.placeholder.com/60?text=Beyonce",
    },
    {
      name: "Rihanna",
      similarityScore: 0.54,
      photoUrl: "https://via.placeholder.com/60?text=Rihanna",
    },
    {
      name: "Katy Perry",
      similarityScore: 0.88,
      photoUrl: "https://via.placeholder.com/60?text=Katy+Perry",
    },
    {
      name: "Ed Sheeran",
      similarityScore: 0.76,
      photoUrl: "https://via.placeholder.com/60?text=Ed+Sheeran",
    },
    {
      name: "Shawn Mendes",
      similarityScore: 0.93,
      photoUrl: "https://via.placeholder.com/60?text=Shawn+Mendes",
    },
    {
      name: "Dua Lipa",
      similarityScore: 0.62,
      photoUrl: "https://via.placeholder.com/60?text=Dua+Lipa",
    },
    {
      name: "The Weeknd",
      similarityScore: 0.81,
      photoUrl: "https://via.placeholder.com/60?text=The+Weeknd",
    },
    {
      name: "Sia",
      similarityScore: 0.58,
      photoUrl: "https://via.placeholder.com/60?text=Sia",
    },
    {
      name: "Justin Timberlake",
      similarityScore: 0.97,
      photoUrl: "https://via.placeholder.com/60?text=Justin+Timberlake",
    },
    {
      name: "Pink",
      similarityScore: 0.64,
      photoUrl: "https://via.placeholder.com/60?text=Pink",
    },
    {
      name: "Kelly Clarkson",
      similarityScore: 0.89,
      photoUrl: "https://via.placeholder.com/60?text=Kelly+Clarkson",
    },
    {
      name: "Ellie Goulding",
      similarityScore: 0.73,
      photoUrl: "https://via.placeholder.com/60?text=Ellie+Goulding",
    },
    {
      name: "Miley Cyrus",
      similarityScore: 0.77,
      photoUrl: "https://via.placeholder.com/60?text=Miley+Cyrus",
    },
    {
      name: "Camila Cabello",
      similarityScore: 0.71,
      photoUrl: "https://via.placeholder.com/60?text=Camila+Cabello",
    },
    {
      name: "Halsey",
      similarityScore: 0.59,
      photoUrl: "https://via.placeholder.com/60?text=Halsey",
    },
    {
      name: "Zayn",
      similarityScore: 0.82,
      photoUrl: "https://via.placeholder.com/60?text=Zayn",
    },
    {
      name: "Troye Sivan",
      similarityScore: 0.61,
      photoUrl: "https://via.placeholder.com/60?text=Troye+Sivan",
    },
  ],
};

export default function ArtistPage() {
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [relatedArtists, setRelatedArtists] = useState<
    { name: string; similarityScore: number; photoUrl: string }[]
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
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header with Search Bar */}
      <div className="p-4 bg-white shadow-md">
        <div className="flex flex-col items-center">
          {selectedArtist ? (
            <div className="text-center">
              <h1 className="text-3xl font-bold">{selectedArtist}</h1>
              <p className="text-gray-600">
                Explore artists similar to {selectedArtist}. Click on any node to explore further.
              </p>
            </div>
          ) : (
            <h1 className="text-3xl font-bold">Artist Explorer</h1>
          )}
          <SearchBar placeholder="Enter artist name" onSearch={handleArtistSearch} />
        </div>
      </div>

      {/* Main Content Area (Canvas) */}
      <div className="flex-grow">
        {selectedArtist && relatedArtists.length > 0 ? (
          <ArtistGraph selectedArtist={selectedArtist} relatedArtists={relatedArtists} />
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Search for an artist to explore their network.</p>
          </div>
        )}
      </div>
    </div>
  );
}
