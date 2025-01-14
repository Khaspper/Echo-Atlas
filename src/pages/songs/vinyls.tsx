import React from 'react';

interface VinylProps {
    songName: string;
    photoUrl: string;
}

const Vinyl: React.FC<VinylProps> = ({ songName, photoUrl }) => {
    return (
        <div className="flex flex-col items-center">
            <div 
                className="w-48 h-48 rounded-full border-4 border-black shadow-lg"
                style={{ 
                    backgroundImage: `url(${photoUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />
            <p className="mt-4 text-lg font-semibold">{songName}</p>
        </div>
    );
};

export default Vinyl;
