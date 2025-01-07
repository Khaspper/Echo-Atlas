import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../services/mongodb';
import Artist from '../../models/Artist';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        await connectToDatabase();

        const { name, photoUrl, relatedArtists } = req.body;

        if (!name || !photoUrl || !Array.isArray(relatedArtists)) {
            return res.status(400).json({ error: 'All fields are required and relatedArtists must be an array' });
        }

        // Check if the artist already exists to avoid duplicates
        let existingArtist = await Artist.findOne({ name });
        if (!existingArtist) {
            // If the artist does not exist, create a new one
            existingArtist = new Artist({ name, photoUrl, relatedArtists: [] });
            await existingArtist.save();
        }

        // Process related artists and reference them by ObjectId
        const relatedArtistIds = [];
        for (const artist of relatedArtists) {
            let existingRelatedArtist = await Artist.findOne({ name: artist.name });
            if (!existingRelatedArtist) {
                existingRelatedArtist = new Artist({
                    name: artist.name,
                    photoUrl: artist.photoUrl,
                });
                await existingRelatedArtist.save();
            }
            relatedArtistIds.push(existingRelatedArtist._id);
        }

        // Update the main artist with the related artist references
        existingArtist.relatedArtists = relatedArtistIds;
        await existingArtist.save();

        res.status(201).json({ message: 'Artist saved successfully with references!', artist: existingArtist });
    } catch (error) {
        console.error('Error saving artist:', error);
        res.status(500).json({ error: 'Failed to save artist data.' });
    }
}
