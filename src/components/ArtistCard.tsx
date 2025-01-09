import React, { useEffect, useState } from 'react';
import getColorPalette from '../utils/getColorPalette'; //? GPT COMMENT: Importing the getColorPalette utility to fetch colors from the artist image

interface ArtistCardProps {
  artist: { name: string; photoUrl: string; topTracks?: { name: string; uri: string }[] };
  onClose: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClose }) => {
  const [specifiedArtist, setSpecifiedArtist] = useState<ArtistCardProps["artist"] | null>(null);
  const [gradientColors, setGradientColors] = useState<string>('');

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

    const generateGradient = async () => {
      try {
        const colors = await getColorPalette(artist.photoUrl);
        // const [color1, color2] = colors.sort(() => 0.5 - Math.random()).slice(0, 2);
        const [color1, color2] = colors.slice(0, 2);
        setGradientColors(`linear-gradient(to bottom right, rgb(${color1.join(',')}), rgb(${color2.join(',')}))`);
      } catch (error) {
        console.error('Error generating gradient:', error);
      }
    };

    fetchArtist();
    generateGradient();
  }, [artist.name, artist.photoUrl]);

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
      <div className="rounded-lg shadow-lg p-6 relative max-w-sm"
           style={{ background: gradientColors }} //? GPT COMMENT: Gradient applied directly to the card instead of the background
      >
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
