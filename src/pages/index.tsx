import React from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push('/artist/explore');
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Orpheus</h1>
      <p className="text-lg text-gray-600 mb-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {/* Similar Artists */}
        <button
          onClick={handleExploreClick}
          className="button w-40 h-12 bg-violet-500 rounded-lg cursor-pointer select-none
            active:translate-y-2  active:[box-shadow:0_0px_0_0_#701bf8,0_0px_0_0_#1b70f841]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_10px_0_0_#701bf8,0_15px_0_0_#1b70f841]
            border-b-[1px] border-violet-400"
        >
          <span className="flex flex-col justify-center items-center h-full text-white font-bold text-lg">
            Explore Artists
          </span>
        </button>
        {/* Similar Songs */}
        <button
          onClick={handleExploreClick}
          className="button w-40 h-12 bg-violet-500 rounded-lg cursor-pointer select-none
            active:translate-y-2  active:[box-shadow:0_0px_0_0_#701bf8,0_0px_0_0_#1b70f841]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_10px_0_0_#701bf8,0_15px_0_0_#1b70f841]
            border-b-[1px] border-violet-400"
        >
          <span className="flex flex-col justify-center items-center h-full text-white font-bold text-lg">
            Similar Songs?
          </span>
        </button>
        {/* Playlist Maker */}
        <button
          onClick={handleExploreClick}
          className="button w-40 h-12 bg-violet-500 rounded-lg cursor-pointer select-none
            active:translate-y-2  active:[box-shadow:0_0px_0_0_#701bf8,0_0px_0_0_#1b70f841]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_10px_0_0_#701bf8,0_15px_0_0_#1b70f841]
            border-b-[1px] border-violet-400"
        >
          <span className="flex flex-col justify-center items-center h-full text-white font-bold text-lg">
            Playlist maker? IDK YET
          </span>
        </button>
        {/* Events... etc */}
        <button
          onClick={handleExploreClick}
          className="button w-40 h-auto bg-violet-500 rounded-lg cursor-pointer select-none
            active:translate-y-2  active:[box-shadow:0_0px_0_0_#701bf8,0_0px_0_0_#1b70f841]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_10px_0_0_#701bf8,0_15px_0_0_#1b70f841]
            border-b-[1px] border-violet-400"
        >
          <span className="flex flex-col justify-center items-center h-full text-white font-bold text-lg">
            Events? Socials? Facts about who ever they searched up for?
          </span>
        </button>
      </div>
    </div>
  );
}
