import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';

const cards = [
    { title: 'Aluna', image: '/images/aluna.jpg' },
    { title: 'Colores', image: '/images/colores.jpg' },
    { title: 'Oh My Gawd', image: '/images/gawd.jpg' }
];

const FloatingCards = React.memo(() => (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {cards.map((card, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotate: Math.random() * 20 - 10 }}
                animate={{ opacity: 1, y: [50, -50, 50], rotate: Math.random() * 20 - 10 }}
                transition={{ repeat: Infinity, duration: Math.random() * 10 + 5 }}
                className="absolute"
                style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            >
                <Image
                    src={card.image}
                    alt={card.title}
                    width={250}
                    height={250}
                    className="rounded-lg shadow-lg"
                />
            </motion.div>
        ))}
    </div>
));

export default function Home() {
    const router = useRouter();
    const [isArtistsEnabled, setIsArtistsEnabled] = useState(true);

    const handleSearch = (query: string) => {
        const basePath = isArtistsEnabled ? 'artist' : 'songwriter';
        router.push(`/${basePath}/explore?query=${encodeURIComponent(query)}`);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-blue-600 flex flex-col items-center justify-center">
            {/* Search Bar Section */}
            <div className="text-center text-white z-10">
                <h1 className="text-6xl font-bold mb-4">for Artists</h1>
                <div className="flex justify-center gap-4 mb-6">
                    <span
                        onClick={() => setIsArtistsEnabled(true)}
                        className={`cursor-pointer px-4 py-2 rounded-full ${isArtistsEnabled ? 'bg-black text-white' : 'bg-gray-800 text-white'}`}
                    >
                        Artists
                    </span>
                    <span
                        onClick={() => setIsArtistsEnabled(false)}
                        className={`cursor-pointer px-4 py-2 rounded-full ${!isArtistsEnabled ? 'bg-black text-white' : 'bg-gray-800 text-white'}`}
                    >
                        Songwriter
                    </span>
                </div>
                <SearchBar onSearch={handleSearch} />
            </div>

            {/* Floating Cards Section */}
            <FloatingCards />
        </div>
    );
}
