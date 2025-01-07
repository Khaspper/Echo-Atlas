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

        // Check if the artist already exists
        let existingArtist = await Artist.findOne({ name });
        if (existingArtist) {
            return res.status(409).json({ error: 'Artist already exists' });
        }

        // Prepare relatedArtists array with ObjectId references
        const relatedArtistsRefs = [];

        for (const artist of relatedArtists) {
            if (!artist.name || !artist.photoUrl) {
                return res.status(400).json({ error: 'Each related artist must have a name and photo URL' });
            }

            let relatedArtist = await Artist.findOne({ name: artist.name });

            // If related artist doesn't exist, create it
            if (!relatedArtist) {
                relatedArtist = await Artist.create({
                    name: artist.name,
                    photoUrl: artist.photoUrl,
                    relatedArtists: []
                });
            }

            relatedArtistsRefs.push({
                artistId: relatedArtist._id,
                similarityScore: artist.similarityScore || null
            });
        }

        // Create the new artist with references
        const newArtist = new Artist({
            name,
            photoUrl,
            relatedArtists: relatedArtistsRefs
        });

        await newArtist.save();

        res.status(201).json({ message: 'Artist saved successfully!', artist: newArtist });
    } catch (error) {
        console.error('Error saving artist:', error);
        res.status(500).json({ error: 'Failed to save artist data.' });
    }
}
