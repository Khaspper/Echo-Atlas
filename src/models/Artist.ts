import mongoose, { Schema, Document } from 'mongoose';

export interface IRelatedArtist {
    artistId: mongoose.Schema.Types.ObjectId; // Using ObjectId reference for related artists
    similarityScore?: number;
}

export interface IArtist extends Document {
    name: string;
    photoUrl: string;
    relatedArtists: IRelatedArtist[];
    createdAt: Date;
}

const RelatedArtistSchema = new Schema<IRelatedArtist>({
    artistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true }, // Refers to another Artist document
    similarityScore: { type: Number }
});

const ArtistSchema = new Schema<IArtist>({
    name: { type: String, required: true, unique: true },  // Prevent duplicate artist names
    photoUrl: { type: String, required: true },
    relatedArtists: [RelatedArtistSchema],  // Only storing ObjectId references now
    createdAt: { type: Date, default: Date.now }
});

// Ensure the model is not recompiled when imported multiple times
const Artist = mongoose.models.Artist || mongoose.model<IArtist>('Artist', ArtistSchema);

export default Artist;
