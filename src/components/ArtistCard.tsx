import React, { useEffect, useState } from 'react';

interface ArtistCardProps {
  artist: { name: string; photoUrl: string; topTracks?: { name: string; uri: string }[] };
  onClose: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClose }) => {
  const [specifiedArtist, setSpecifiedArtist] = useState<ArtistCardProps["artist"] | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch('/api/get-artists');
        const data = await response.json();
        const foundArtist = data.find((a: { name: string }) => a.name === artist.name);
        setSpecifiedArtist(foundArtist);
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    };

    fetchArtist();
  }, [artist.name]);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-lg z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 relative max-w-sm">
        <button
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={onClose}
        >
          ✖
        </button>
        <img
          src={specifiedArtist?.photoUrl || artist.photoUrl}
          alt={specifiedArtist?.name || artist.name}
          className="w-32 h-32 rounded-full mx-auto"
        />
        <h2 className="text-2xl font-bold text-center mt-4">{specifiedArtist?.name || artist.name}</h2>
        {specifiedArtist?.topTracks && specifiedArtist.topTracks.length > 0 ? (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Top Tracks:</h3>
            <ul className="list-disc list-inside">
              {specifiedArtist.topTracks.map((track, index) => (
                <li key={index}>
                  <iframe
                    src={`https://open.spotify.com/embed/track/${track.uri.split(':').pop()}`}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allow="encrypted-media"
                  ></iframe>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center mt-4">No top tracks available.</p>
        )}
      </div>
    </div>
  );
};

export default ArtistCard;
