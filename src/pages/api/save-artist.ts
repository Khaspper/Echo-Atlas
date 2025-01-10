import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../services/mongodb';
import Artist from '../../models/Artist';

// API endpoint to handle saving artist data into the database
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Restricting the endpoint to only handle POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        await connectToDatabase();

        // Destructuring the incoming request body for artist data
        const { name, photoUrl, relatedArtists, topTracks, colorPalette } = req.body;

        // Basic validation to ensure required fields are provided
        if (!name || !photoUrl || !Array.isArray(relatedArtists) || !Array.isArray(topTracks)) {
            return res.status(400).json({ error: 'All fields are required and relatedArtists and topTracks must be arrays' });
        }

        // Define a default black and white gradient if no colorPalette is provided
        const defaultColorPalette = [
            [0, 0, 0], // Black color
            [255, 255, 255] // White color
        ];

        // Check if the artist already exists in the database
        let existingArtist = await Artist.findOne({ name });

        // If the artist exists, update their related artists only if the array is empty
        if (existingArtist) {
            if (existingArtist.relatedArtists.length === 0) {
                const relatedArtistsRefs = await Promise.all(
                    relatedArtists.map(async (artist: { name: string; photoUrl: string; similarityScore?: number; topTracks: { name: string; uri: string }[], colorPalette?: number[][] }) => { 
                        let relatedArtist = await Artist.findOne({ name: artist.name });
                        if (!relatedArtist) {
                            relatedArtist = await Artist.create({
                                name: artist.name,
                                photoUrl: artist.photoUrl,
                                relatedArtists: [],
                                topTracks: artist.topTracks,
                                colorPalette: artist.colorPalette || defaultColorPalette 
                            });
                        }
                        return { artistId: relatedArtist._id, similarityScore: artist.similarityScore || null}; 
                    })
                );

                existingArtist.relatedArtists = relatedArtistsRefs;
                existingArtist.colorPalette = colorPalette || defaultColorPalette; 
                await existingArtist.save();
                return res.status(200).json({ message: 'Related artists updated successfully!', artist: existingArtist });
            }
            return res.status(409).json({ error: 'Artist already exists and related artists are already populated.' });
        }

        // If the artist is new, create and save them along with related artists
        const relatedArtistsRefs = await Promise.all(
            relatedArtists.map(async (artist: { name: string; photoUrl: string; similarityScore?: number; topTracks: { name: string; uri: string }[], colorPalette?: number[][] }) => { 
                let relatedArtist = await Artist.findOne({ name: artist.name });
                if (!relatedArtist) {
                    relatedArtist = await Artist.create({
                        name: artist.name,
                        photoUrl: artist.photoUrl,
                        relatedArtists: [],
                        topTracks: artist.topTracks,
                        colorPalette: artist.colorPalette || defaultColorPalette
                    });
                }
                return { artistId: relatedArtist._id, similarityScore: artist.similarityScore || null }; 
            })
        );

        // Create and save the new artist document with top tracks and color palette
        const newArtist = new Artist({
            name,
            photoUrl,
            relatedArtists: relatedArtistsRefs,
            topTracks: topTracks.map((track: { name: string; uri: string }) => ({
                name: track.name,
                uri: track.uri
            })),
            colorPalette: colorPalette || defaultColorPalette
        });

        await newArtist.save();
        res.status(201).json({ message: 'Artist saved successfully!', artist: newArtist });

    } catch (error) {
        console.error('Error saving artist:', error);
        console.log("error", error)
        res.status(500).json({ error: 'Failed to save artist data.' });
    }
}