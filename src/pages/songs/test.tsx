// "use client"; // Ensure this is a Client Component

// import React, { useState, useEffect } from 'react';
// import { searchSong } from '@/services/spotify';

// const TestPage = () => {
//     const [songData, setSongData] = useState<any>(null);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchSong = async () => {
//             try {
//                 const result = await searchSong('ykwim', 'yot club');
//                 setSongData(result);
//             } catch (error: any) {
//                 setError(error.message);
//             }
//         };
//         fetchSong();
//     }, []);

//     return (
//         <div>
//             <h1 className="text-3xl font-bold">Test Page</h1>
//             {error ? (
//                 <p>Error: {error}</p>
//             ) : (
//                 <pre>{JSON.stringify(songData, null, 2)}</pre>
//             )}
//         </div>
//     );
// };

// export default TestPage;
