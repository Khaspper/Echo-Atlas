import React, { useEffect, useState } from 'react';

interface ArtistCardProps {
  artist: { name: string; photoUrl: string; topTracks?: { name: string; uri: string }[]; colorPalette?: number[][] };
  onClose: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClose }) => {
  const [specifiedArtist, setSpecifiedArtist] = useState<ArtistCardProps["artist"] | null>(null);
  const [gradientColors, setGradientColors] = useState<string>('');
  const [borderGradient, setBorderGradient] = useState<string>('');
  const [profileBorderGradient, setProfileBorderGradient] = useState<string>('');

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch('/api/get-artists');
        const data = await response.json();
        const foundArtist = data.find((a: { name: string }) => a.name === artist.name);
        setSpecifiedArtist(foundArtist);

        if (foundArtist.colorPalette) {
          const [color1, color2] = foundArtist.colorPalette.slice(0, 2);
          const [color3, color4] = foundArtist.colorPalette.slice(2, 4);
          setGradientColors(`linear-gradient(to bottom right, rgba(${color1.join(',')},0.9), rgba(${color2.join(',')},0.9))`);
          setBorderGradient(`from-[rgba(${color3.join(',')},0.9)] to-[rgba(${color4.join(',')},0.9)]`);
        }
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    };

    fetchArtist();
  }, [artist.name, artist.photoUrl]);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-lg z-50 transition-all duration-300"
      onClick={handleOutsideClick}
    >
      <div className="rounded-xl shadow-2xl p-6 relative max-w-sm text-white"
           style={{ background: gradientColors }}
      >
        <button
          className="absolute top-2 right-4 text-2xl font-bold hover:text-red-500 transition-all"
          onClick={onClose}
        >
          &times;
        </button>

        <div className={`relative w-36 h-36 mx-auto rounded-full p-1 bg-gradient-to-r ${profileBorderGradient} shadow-2xl`}> 
          <img
            src={specifiedArtist?.photoUrl || artist.photoUrl}
            alt={specifiedArtist?.name || artist.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <h2 className="text-3xl font-bold text-center mt-4 tracking-wide">{specifiedArtist?.name || artist.name}</h2>

        {specifiedArtist?.topTracks && specifiedArtist.topTracks.length > 0 ? (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-center mb-2">Top Tracks:</h3>
            <ul className="space-y-4">
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
          </div>
        ) : (
          <p className="text-center mt-4">No top tracks available.</p>
        )}
      </div>
    </div>
  );
};

export default ArtistCard;
