import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import ArtistGraph from '../../components/ArtistGraph';
import { fetchRelatedArtists } from '../../services/lastfm';
import { fetchArtistDetails } from '../../services/spotify';

// Main component for exploring artists
export default function ArtistPage() {
  // State variables to store artist data and loading status
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [artistPhoto, setArtistPhoto] = useState<string | null>(null);
  const [relatedArtists, setRelatedArtists] = useState<
    { name: string; similarityScore: number; photoUrl: string }[]
  >([]);
  const [topTracks, setTopTracks] = useState<{ name: string; uri: string }[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to handle searching for an artist
  const handleArtistSearch = async (artistName: string) => {
    setLoading(true);
    try {
      // Fetching artist data from the database
      const response = await fetch('/api/get-artists');
      const data = await response.json();
      const cachedArtist = data.find(
        (artist: { name: string }) => artist.name.toLowerCase() === artistName.toLowerCase()
      );

      // If the artist is found in the database, load the data from the cache
      if (cachedArtist) {
        setSelectedArtist(cachedArtist.name);
        setArtistPhoto(cachedArtist.photoUrl);
        setRelatedArtists(cachedArtist.relatedArtists);
        setTopTracks(cachedArtist.topTracks);
        setLoading(false);

        // If related artists are not available, fetch them from the API
        if (cachedArtist.relatedArtists.length === 0) {
          const artistsFromLastFm = await fetchRelatedArtists(artistName);
          const updatedRelatedArtists = await Promise.all(
            artistsFromLastFm.map(async (artist: { name: string; similarityScore: number; photoUrl: string }) => {
              try {
                const details = await fetchArtistDetails(artist.name);
                const relatedTopTracks = details.topTracks;
                return {
                  ...artist,
                  photoUrl: details.imageURL || artist.photoUrl,
                  topTracks: relatedTopTracks,
                };
              } catch (error) {
                console.error(`Error fetching details for ${artist.name}:`, error);
                return artist;
              }
            })
          );

          // Save the updated related artists and top tracks in the database
          await fetch('/api/save-artist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: cachedArtist.name,
              photoUrl: cachedArtist.photoUrl,
              relatedArtists: updatedRelatedArtists,
              topTracks,
            }),
          });
          setRelatedArtists(updatedRelatedArtists);
        }
        return;
      }

      // Fetching artist data from external APIs
      const artistDetails = await fetchArtistDetails(artistName);
      artistName = artistDetails.name
      setSelectedArtist(artistName);
      setArtistPhoto(artistDetails.imageURL || 'https://via.placeholder.com/150');
      const fetchedTopTracks = artistDetails.topTracks;
      setTopTracks(fetchedTopTracks);

      // Fetch related artists data from Last.fm
      const artistsFromLastFm = await fetchRelatedArtists(artistName);
      const updatedRelatedArtists = await Promise.all(
        artistsFromLastFm.map(async (artist: { name: string; similarityScore: number; photoUrl: string }) => {
          try {
            const details = await fetchArtistDetails(artist.name);
            const relatedTopTracks = details.topTracks;
            return {
              ...artist,
              photoUrl: details.imageURL || artist.photoUrl,
              topTracks: relatedTopTracks,
            };
          } catch (error) {
            console.error(`Error fetching details for ${artist.name}:`, error);
            return artist;
          }
        })
      );

      // Save the new artist data and related artists in the database
      await fetch('/api/save-artist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: artistDetails.name,
          photoUrl: artistDetails.imageURL,
          relatedArtists: updatedRelatedArtists,
          topTracks: fetchedTopTracks,
        }),
      });

      setRelatedArtists(updatedRelatedArtists);
    } catch (error) {
      console.error(error);
      alert('Could not find the artist or related data. Try a different search.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header section with search bar */}
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

      {/* Main content area where the graph is displayed */}
      <div className="flex-grow">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : selectedArtist && relatedArtists.length > 0 ? (
          <ArtistGraph
            selectedArtist={selectedArtist}
            relatedArtists={relatedArtists}
            centerArtistPhoto={artistPhoto}
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
