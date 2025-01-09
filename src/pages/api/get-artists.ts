import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../services/mongodb';
import Artist, { IArtist } from '../../models/Artist';

interface PopulatedArtist {
    name: string;
    photoUrl: string;
    relatedArtists: {
        artistId: {
            name: string;
            photoUrl: string;
        };
        similarityScore?: number;
        //! I dont think we need this
        // colorPalette?: number[][];
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
            .lean();  // Returns a plain JavaScript object, losing the IArtist structure.

        // Explicitly cast to match the expected structure for safer handling
        const formattedArtists = artists.map(artist => ({
            name: artist.name,
            photoUrl: artist.photoUrl,
            createdAt: artist.createdAt,
            colorPalette: artist.colorPalette || [],
            relatedArtists: artist.relatedArtists.map((related: any) => ({
                name: related.artistId?.name || 'Unknown',
                photoUrl: related.artistId?.photoUrl || 'https://via.placeholder.com/150',
                similarityScore: related.similarityScore,
                colorPalette: related.colorPalette || []
            })),
            topTracks: artist.topTracks.map((track: any) => ({
                name: track.name,
                uri: track.uri
            }))
        })) as PopulatedArtist[];

        res.status(200).json(formattedArtists);
    } catch (error) {
        console.error('Error fetching artists:', error);
        res.status(500).json({ error: 'Failed to fetch artist data.' });
    }
}
