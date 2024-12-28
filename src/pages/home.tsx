import { useState } from 'react';

const relatedArtists: Record<string, string[]> = {
  "Taylor Swift": ["Ed Sheeran", "Adele", "Harry Styles"],
  "Ed Sheeran": ["Taylor Swift", "Sam Smith", "John Mayer"],
};

const Home = () => {
  const [artist, setArtist] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = () => {
    setResults(relatedArtists[artist] || ["No related artists found."]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Echo-Atlas</h1>
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          placeholder="Type an artist's name..."
          className="border border-gray-300 p-2 rounded-md"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Related Artists:</h2>
        <ul className="list-disc ml-4">
          {results.map((related, index) => (
            <li key={index} className="mt-1">{related}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
