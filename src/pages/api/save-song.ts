import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../services/mongodb';
import mongoose, { Schema, Document } from 'mongoose';
import Song from '../../models/Song';

// API endpoint to handle saving song data into the database
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        await connectToDatabase();

        const { title, artistName, photoUrl, spotifyUri, similarSongs } = req.body;

        if (!title || !artistName || !photoUrl || !spotifyUri) {
            return res.status(400).json({ error: 'Title, artistName, photoUrl, and spotifyUri are required.' });
        }

        let existingSong = await Song.findOne({ title, artistName });

        if (existingSong) {
            return res.status(409).json({ error: 'Song already exists.' });
        }

        // Properly map similar songs with ObjectId references
        const similarSongsArray = similarSongs?.map((song: { songId: string }) => ({
          songId: new mongoose.Types.ObjectId(song.songId)
        })) || [];

        const newSong = new Song({
            title,
            artistName,
            photoUrl,
            spotifyUri,
            similarSongs: similarSongsArray
        });

        await newSong.save();
        return res.status(201).json({ message: 'Song saved successfully!', song: newSong });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        console.error('Error:', errorMessage);
        res.status(500).json({ error: 'Failed to save song data.', details: errorMessage });
    }
}
