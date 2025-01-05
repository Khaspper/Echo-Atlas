import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../services/mongodb';
import Artist from '../../models/Artist';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    await connectToDatabase();

    // Fetch all artists from the MongoDB collection
    const artists = await Artist.find({});

    // Return the list of artists as a JSON response
    res.status(200).json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);

    // Return an error message if the fetch fails
    res.status(500).json({ error: 'Error!!!!!!! No artist in database.' });
  }
}
