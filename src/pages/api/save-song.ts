import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../services/mongodb';
import Song from '../../models/Song';

// API endpoint to handle saving song data into the database
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Restricting the endpoint to only handle POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        await connectToDatabase();

        // Destructuring the incoming request body for song data
        const { title, artistName, photoUrl, spotifyUri, similarSongs } = req.body;

        // Basic validation to ensure required fields are provided
        if (!title || !artistName || !photoUrl || !spotifyUri || !Array.isArray(similarSongs)) {
            return res.status(400).json({ error: 'All fields are required and similarSongs must be an array' });
        }
        console.log(req.body)
        console.log('1')
        // Check if the song already exists in the database
        let existingSong = await Song.findOne({ title, artistName });
        console.log('2')
        
        // If the song exists, update similar songs only if the array is empty
        if (existingSong) {
            console.log('3')
            if (existingSong.similarSongs.length === 0) {
                console.log('4')
                const similarSongsRefs = await Promise.all(
                    similarSongs.map(async (song: { title: string; artistName?: string; photoUrl: string; spotifyUri: string }) => {
                        console.log('song: ', song)
                        let similarSong = await Song.findOne({ title: song.title, artistName: song.artistName || artistName });
                        console.log('similarSong: ', similarSong)
                        if (!similarSong) {
                            console.log('!similarSong: ', song)
                            similarSong = await Song.create({
                                title: song.title,
                                artistName: song.artistName || artistName,
                                photoUrl: song.photoUrl,
                                spotifyUri: song.spotifyUri
                            });
                            console.log("Done Making similarSong")
                        }
                        console.log("Returning")
                        return { songId: similarSong._id || null};
                    })
                );
                
                console.log('5')
                existingSong.similarSongs = similarSongsRefs;
                await existingSong.save();
                return res.status(200).json({ message: 'Similar songs updated successfully!', song: existingSong });
            }
            return res.status(409).json({ error: 'Song already exists and similar songs are already populated.' });
        }
        console.log('6')
        
        // If the song is new, create and save it along with similar songs
        const similarSongsRefs = await Promise.all(
            similarSongs.map(async (song: { title: string; artistName: string; photoUrl: string; spotifyUri: string }) => {
                return song
            })
        );
        
        // Create and save the new song document
        const newSong = new Song({
            title,
            artistName,
            photoUrl,
            spotifyUri,
            similarSongs: similarSongsRefs
        });

        await newSong.save();
        res.status(201).json({ message: 'Song saved successfully!', song: newSong });

    } catch (error) {
        console.error('Error saving song:', error);
        res.status(500).json({ error: 'Failed to save song data.' });
    }
}
