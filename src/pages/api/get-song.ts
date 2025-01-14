import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../services/mongodb';
import Song, { ISong } from '../../models/Song';

interface PopulatedSong {
    title: string;
    artists: {
        name: string;
        photoUrl: string;
    }[];
    albumCoverUrl: string;
    releaseDate: Date;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDatabase();

        // Fetch all songs with populated artists
        const songs = await Song.find({})
            .populate({
                path: 'artists',
                select: 'name photoUrl'
            })
            .lean();

        // Format the data to match the expected structure
        const formattedSongs = songs.map(song => ({
            title: song.title,
            albumCoverUrl: song.albumCoverUrl || 'https://via.placeholder.com/150',
            releaseDate: song.releaseDate,
            artists: song.artists.map((artist: any) => ({
                name: artist.name,
                photoUrl: artist.photoUrl || 'https://via.placeholder.com/150'
            }))
        })) as PopulatedSong[];

        res.status(200).json(formattedSongs);
    } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).json({ error: 'Failed to fetch song data.' });
    }
}
