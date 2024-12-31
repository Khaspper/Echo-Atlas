import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import ArtistGraph from '../../components/ArtistGraph';
import { fetchArtistDetails } from '../../services/spotify'; // Import Spotify service

export default function ArtistPage() {
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [artistPhoto, setArtistPhoto] = useState<string | null>(null); // Store the central artist's photo
  const [relatedArtists, setRelatedArtists] = useState<
    { name: string; similarityScore: number; photoUrl: string }[]
  >([]);

  const hardcodedRelatedArtists = [
    {
      name: 'Ed Sheeran',
      similarityScore: 1,
      photoUrl: 'https://via.placeholder.com/60?text=Ed+Sheeran',
    },
    {
      name: 'Adele',
      similarityScore: 0.85,
      photoUrl: 'https://via.placeholder.com/60?text=Adele',
    },
    {
      name: 'Sam Smith',
      similarityScore: 0.8,
      photoUrl: 'https://via.placeholder.com/60?text=Sam+Smith',
    },
    {
      name: 'Shawn Mendes',
      similarityScore: 0.75,
      photoUrl: 'https://via.placeholder.com/60?text=Shawn+Mendes',
    },
    {
      name: 'Dua Lipa',
      similarityScore: 0.7,
      photoUrl: 'https://via.placeholder.com/60?text=Dua+Lipa',
    },
  ];

  const handleArtistSearch = async (artistName: string) => {
    try {
      // Fetch the main artist details
      const artist = await fetchArtistDetails(artistName);

      // Update the state with the main artist details
      setSelectedArtist(artist.name); // Store the artist's name
      setArtistPhoto(artist.imageURL || 'https://via.placeholder.com/150'); // Store the artist's photo
      setRelatedArtists(hardcodedRelatedArtists); // Use hardcoded related artists
    } catch (error) {
      console.error('Error fetching artist details:', error);
      alert('Artist not found. Try another search.');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header with Search Bar */}
      <div className="p-4 bg-white shadow-md">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">Artist Explorer</h1>
          <SearchBar placeholder="Enter artist name" onSearch={handleArtistSearch} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex justify-center items-center">
        {selectedArtist && relatedArtists.length > 0 ? (
          <ArtistGraph
            selectedArtist={selectedArtist}
            relatedArtists={relatedArtists.map((artist) => ({
              ...artist,
              similarityScore: artist.similarityScore, // Keep similarity scores intact
            }))}
            centerArtistPhoto={artistPhoto} // Pass the central artist's photo
          />
        ) : (
          <p className="text-gray-500">Search for an artist to explore their network.</p>
        )}
      </div>
    </div>
  );
}
