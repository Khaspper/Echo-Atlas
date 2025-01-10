import React, { useEffect, useState } from 'react';

interface Artist {
  name: string;
  photoUrl: string;
  topTracks?: { name: string; uri: string }[];
  colorPalette?: number[][];
}

interface ArtistCardProps {
  artist: Artist;
  onClose: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClose }) => {
  const [specifiedArtist, setSpecifiedArtist] = useState<Artist | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [gradients, setGradients] = useState({
    background: '',
    border: '',
    profileBorder: '',
  });

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch('/api/get-artists');
        const data = await response.json();
        const foundArtist = data.find((a: Artist) => a.name === artist.name);
        setSpecifiedArtist(foundArtist || artist);

        if (foundArtist?.colorPalette) {
          setGradients(generateGradients(foundArtist.colorPalette));
        }
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    };

    fetchArtist();
  }, [artist.name, artist.photoUrl]);

  const generateGradients = (colorPalette: number[][]) => {
    const [color1, color2, color3, color4] = colorPalette;
    return {
      background: `linear-gradient(to bottom right, rgba(${color1.join(',')},0.9), rgba(${color2.join(',')},0.9))`,
      border: `from-[rgba(${color3.join(',')},0.9)] to-[rgba(${color4.join(',')},0.9)]`,
      profileBorder: `bg-gradient-to-r from-[rgba(${color3.join(',')},0.9)] to-[rgba(${color4.join(',')},0.9)]`,
    };
  };

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <div className="fixed bottom-0 right-0 w-full max-w-md p-4 overflow-y-auto z-50 transition-all duration-300">
      <div
        className="rounded-xl shadow-2xl p-6 relative max-w-md text-white"
        style={{ background: gradients.background }}
      >
        {/* Close Button */}
        <button className="absolute top-2 right-4 text-2xl font-bold hover:text-red-500 transition-all" onClick={onClose}>
          &times;
        </button>

        {/* Collapse Button */}
        <button className="absolute top-2 left-4 text-2xl font-bold hover:text-blue-500 transition-all" onClick={toggleCollapse}>
          {isCollapsed ? '+' : '-'}
        </button>

        {/* Artist Image */}
        <div className={`relative w-36 h-36 mx-auto rounded-full p-1 ${gradients.profileBorder} shadow-2xl`}>
          <img
            src={specifiedArtist?.photoUrl || artist.photoUrl}
            alt={specifiedArtist?.name || artist.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Artist Name */}
        <h2 className="text-3xl font-bold text-center mt-4 tracking-wide">{specifiedArtist?.name || artist.name}</h2>

        {/* Top Tracks Section */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            isCollapsed ? 'h-0 opacity-0 overflow-hidden' : 'h-auto opacity-100'
          }`}
        >
          {specifiedArtist?.topTracks?.length ? (
            <ul className="space-y-4 mt-6">
              {specifiedArtist.topTracks.map((track, index) => (
                <li key={index} className="bg-gray-800 bg-opacity-70 p-2 rounded-lg shadow-lg">
                  <iframe
                    src={`https://open.spotify.com/embed/track/${track.uri.split(':').pop()}`}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allow="encrypted-media"
                    className="rounded-lg"
                  ></iframe>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-sm opacity-80 mt-4">No top tracks available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
