import mongoose, { Schema, Document, Types } from 'mongoose';

/**
 * Related artists will now be stored as ObjectId references instead of full objects.
 */

export interface IArtist extends Document {
    name: string;
    photoUrl: string;
    relatedArtists: Types.ObjectId[]; // Changed to references
    createdAt: Date;
}

const ArtistSchema = new Schema<IArtist>({
    name: { type: String, required: true, unique: true },
    photoUrl: { type: String, required: true },
    relatedArtists: [{ type: Schema.Types.ObjectId, ref: 'Artist' }], // Storing references
    createdAt: { type: Date, default: Date.now }
});

const Artist = mongoose.models.Artist || mongoose.model<IArtist>('Artist', ArtistSchema);

export default Artist;
