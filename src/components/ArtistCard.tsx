import React from 'react';

interface ArtistCardProps {
  artist: { name: string; photoUrl: string };
  onClose: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClose }) => {
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
          src={artist.photoUrl}
          alt={artist.name}
          className="w-32 h-32 rounded-full mx-auto"
        />
        <h2 className="text-2xl font-bold text-center mt-4">{artist.name}</h2>
      </div>
    </div>
  );
};

export default ArtistCard;