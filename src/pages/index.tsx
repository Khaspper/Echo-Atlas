import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from 'next/image';

// const cards = [
//     { title: 'Aluna', image: '/images/aluna.jpg' },
//     { title: 'Colores', image: '/images/colores.jpg' },
//     { title: 'Oh My Gawd', image: '/images/gawd.jpg' }
// ];

// const FloatingCards = React.memo(() => (
//     <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
//         {cards.map((card, index) => (
//             <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 50, rotate: Math.random() * 20 - 10 }}
//                 animate={{ opacity: 1, y: [50, -50, 50], rotate: Math.random() * 20 - 10 }}
//                 transition={{ repeat: Infinity, duration: Math.random() * 10 + 5 }}
//                 className="absolute"
//                 style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
//             >
//                 <Image
//                     src={card.image}
//                     alt={card.title}
//                     width={250}
//                     height={250}
//                     className="rounded-lg shadow-lg"
//                 />
//             </motion.div>
//         ))}
//     </div>
// ));

export default function Home() {
    const router = useRouter();

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-indigo-700 to-indigo-900 flex flex-col items-center justify-center">
            {/* Search Bar Section */}
            <div className="text-center text-white z-10">
                <h1 className="text-6xl font-bold mb-4">Explore Music</h1>
                <div className="flex justify-center gap-4 mb-6">
                <button onClick={() => router.push('/artist/explore')} className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">Artists</span>
                    <span className="relative invisible">Artists</span>
                </button>
                    <button onClick={() => router.push('#')} className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">Songs: Coming Soon</span>
                        <span className="relative invisible">Songs: Coming Soon</span>
                    </button>
                    <button onClick={() => router.push('#')} className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">Playlist Maker: Coming Soon</span>
                        <span className="relative invisible">Playlist Maker: Coming Soon</span>
                    </button>
                </div>
            </div>

            {/* Floating Cards Section */}
            {/* <FloatingCards /> */}
        </div>
    );
}
