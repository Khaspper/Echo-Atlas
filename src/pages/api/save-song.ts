import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../services/mongodb';
import Song from '../../models/Song';

// API endpoint to handle saving song data into the database
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        await connectToDatabase();

        const { title, artistName, photoUrl, spotifyUri, similarSongs } = req.body;

        if (!title || !artistName || !photoUrl || !spotifyUri || !Array.isArray(similarSongs)) {
            return res.status(400).json({ error: 'All fields are required and similarSongs must be an array' });
        }

        let existingSong = await Song.findOne({ title, artistName });

        if (existingSong) {
            if (existingSong.similarSongs.length === 0) {
                const similarSongRefs = await Promise.all(
                    similarSongs.map(async (songId: string) => {
                        let similarSong = await Song.findById(songId);
                        if (!similarSong) {
                            throw new Error('Referenced similar song not found');
                        }
                        return { songId: similarSong._id };
                    })
                );

                existingSong.similarSongs = similarSongRefs;
                await existingSong.save();
                return res.status(200).json({ message: 'Similar songs updated successfully!', song: existingSong });
            }
            return res.status(409).json({ error: 'Song already exists and similar songs are already populated.' });
        }

        const newSong = new Song({
            title,
            artistName,
            photoUrl,
            spotifyUri,
            similarSongs: similarSongs.map((songId: string) => ({ songId }))
        });

        await newSong.save();
        res.status(201).json({ message: 'Song saved successfully!', song: newSong });

    } catch (error) {
        console.error('Error saving song:', error);
        res.status(500).json({ error: 'Failed to save song data.' });
    }
}
