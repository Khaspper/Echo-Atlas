// TESTING MONGODB CONNECTION!!!!!!!!!
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../services/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();
    res.status(200).json({ message: 'MongoDB Connected Successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
}
