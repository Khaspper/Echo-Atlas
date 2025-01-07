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

        //? GPT COMMENT: Check if the artist already exists
        let existingArtist = await Artist.findOne({ name });
        
        if (existingArtist) {
            //? GPT COMMENT: If artist exists but related artists are empty, update the related artists
            if (existingArtist.relatedArtists.length === 0 && relatedArtists.length > 0) {
                const relatedArtistsRefs = await Promise.all(
                    relatedArtists.map(async (artist: { name: string; photoUrl: string; similarityScore?: number }) => {
                        let relatedArtist = await Artist.findOne({ name: artist.name });
                        if (!relatedArtist) {
                            relatedArtist = await Artist.create({
                                name: artist.name,
                                photoUrl: artist.photoUrl,
                                relatedArtists: []
                            });
                        }
                        return { artistId: relatedArtist._id, similarityScore: artist.similarityScore || null };
                    })
                );

                //? GPT COMMENT: Updating the existing artist with the new related artists
                existingArtist.relatedArtists = relatedArtistsRefs;
                await existingArtist.save();
            }

            return res.status(409).json({ error: 'Artist already exists. Related artists updated if missing.' });
        }

        //? GPT COMMENT: Prepare relatedArtists array with ObjectId references
        const relatedArtistsRefs = await Promise.all(
            relatedArtists.map(async (artist: { name: string; photoUrl: string; similarityScore?: number }) => {
                let relatedArtist = await Artist.findOne({ name: artist.name });
                if (!relatedArtist) {
                    relatedArtist = await Artist.create({
                        name: artist.name,
                        photoUrl: artist.photoUrl,
                        relatedArtists: []
                    });
                }
                return { artistId: relatedArtist._id, similarityScore: artist.similarityScore || null };
            })
        );

        //? GPT COMMENT: Create the new artist with related artists references
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
