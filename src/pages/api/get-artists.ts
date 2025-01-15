import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../services/mongodb';
import Artist from '../../models/Artist';

interface PopulatedArtist {
    name: string;
    photoUrl: string;
    relatedArtists: {
        name: string;
        photoUrl: string;
        similarityScore?: number;
        colorPalette?: number[][];
    }[];
    topTracks: {
        name: string;
        uri: string;
    }[];
    colorPalette?: number[][];
    createdAt: Date;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDatabase();

        // Fetch all artists with populated relatedArtists and topTracks
        const artists = await Artist.find({})
            .populate({
                path: 'relatedArtists.artistId',
                select: 'name photoUrl'
            })
            .lean();

        // Explicitly cast the data into the PopulatedArtist structure for type safety
        const formattedArtists: PopulatedArtist[] = artists.map((artist) => ({
            name: artist.name,
            photoUrl: artist.photoUrl,
            createdAt: artist.createdAt,
            colorPalette: artist.colorPalette || [],
            relatedArtists: artist.relatedArtists.map((related: {
                artistId?: { name: string; photoUrl: string };
                similarityScore?: number;
                colorPalette?: number[][];
            }) => ({
                name: related.artistId?.name || 'Unknown',
                photoUrl: related.artistId?.photoUrl || 'https://via.placeholder.com/150',
                similarityScore: related.similarityScore,
                colorPalette: related.colorPalette || []
            })),
            topTracks: artist.topTracks.map((track: { name: string; uri: string }) => ({
                name: track.name,
                uri: track.uri
            }))
        }));

        res.status(200).json(formattedArtists);
    } catch (error: unknown) {
        console.error('Error fetching artists:', error);
        res.status(500).json({ error: 'Failed to fetch artist data.' });
    }
}
