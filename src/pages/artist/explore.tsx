import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import ArtistGraph from '../../components/ArtistGraph';
import { fetchRelatedArtists } from '../../services/lastfm';
import { fetchArtistDetails } from '../../services/spotify'; // Ensure Spotify service is imported

export default function ArtistPage() {
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [artistPhoto, setArtistPhoto] = useState<string | null>(null); // State for the central artist's photo
  const [relatedArtists, setRelatedArtists] = useState<
    { name: string; similarityScore: number; photoUrl: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleArtistSearch = async (artistName: string) => {
    setLoading(true);
    try {
      // Fetch central artist details from Spotify
      const artistDetails = await fetchArtistDetails(artistName);
      setSelectedArtist(artistDetails.name);
      setArtistPhoto(artistDetails.imageURL || 'https://via.placeholder.com/150'); // Default photo if none found

      // Fetch related artists from Last.fm
      const artists = await fetchRelatedArtists(artistName);
      setRelatedArtists(artists);
    } catch (error) {
      console.error(error);
      alert('Could not find the artist or related data. Try a different search.');
    } finally {
      setLoading(false);
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

      {/* Main Content Area */}
      <div className="flex-grow">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : selectedArtist && relatedArtists.length > 0 ? (
          <ArtistGraph
            selectedArtist={selectedArtist}
            relatedArtists={relatedArtists}
            centerArtistPhoto={artistPhoto} // Pass the central artist's photo
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Search for an artist to explore their network.</p>
          </div>
        )}
      </div>
    </div>
  );
}
