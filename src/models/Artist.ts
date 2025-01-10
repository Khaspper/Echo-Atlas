import mongoose, { Schema, Document } from 'mongoose';

export interface IRelatedArtist {
    artistId: mongoose.Schema.Types.ObjectId; // Using ObjectId reference for related artists
    similarityScore?: number;
}

export interface ITopTrack {
    name: string;
    uri: string;
}

export interface IArtist extends Document {
    name: string;
    photoUrl: string;
    relatedArtists: IRelatedArtist[];
    topTracks: ITopTrack[];
    colorPalette?: number[][];
    createdAt: Date;
}

const RelatedArtistSchema = new Schema<IRelatedArtist>({
    artistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
    similarityScore: { type: Number },
});

const TopTrackSchema = new Schema<ITopTrack>({
    name: { type: String, required: true },
    uri: { type: String, required: true }
});

const ArtistSchema = new Schema<IArtist>({
    name: { type: String, required: true, unique: true },
    photoUrl: { type: String, required: true },
    relatedArtists: [RelatedArtistSchema],
    topTracks: [TopTrackSchema],
    colorPalette: { type: [[Number]] },
    createdAt: { type: Date, default: Date.now }
});

// Ensure the model is not recompiled when imported multiple times
const Artist = mongoose.models.Artist || mongoose.model<IArtist>('Artist', ArtistSchema);

export default Artist;
