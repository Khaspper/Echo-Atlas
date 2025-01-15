import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../services/mongodb';
import Song from '../../models/Song';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDatabase();

        const { title, artistName } = req.query;

        const songs = await Song.find({
            title: { $regex: new RegExp(title as string, 'i') },
            artistName: { $regex: new RegExp(artistName as string, 'i') }
        }).lean();

        if (songs.length === 0) {
            return res.status(404).json({ error: 'No matching song found' });
        }

        for (const song of songs) {
            const similarSongIds = song.similarSongs.map((similar: any) => similar.songId);
            const similarSongs = await Song.find({ _id: { $in: similarSongIds } }).lean();
            console.log('Similar Songs wowzers:', similarSongs);
        }

        res.status(200).json(songs);
    } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).json({ error: 'Failed to fetch song data.' });
    }
}
