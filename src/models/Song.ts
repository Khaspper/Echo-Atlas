import mongoose, { Schema, Document } from 'mongoose';

export interface ISimilarSong {
    songId: mongoose.Schema.Types.ObjectId; // Using ObjectId reference for similar songs
}

export interface ISong extends Document {
    title: string;
    artistName: string;
    photoUrl: string;
    spotifyUri: string;
    similarSongs: ISimilarSong[];
}

const SimilarSongSchema = new Schema<ISimilarSong>({
    songId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true }
});

const SongSchema = new Schema<ISong>({
    title: { type: String, required: true },
    artistName: { type: String, required: true },
    photoUrl: { type: String, required: true },
    spotifyUri: { type: String, required: true },
    similarSongs: [SimilarSongSchema],
});

// Ensure the model is not recompiled when imported multiple times
const Song = mongoose.models.Song || mongoose.model<ISong>('Song', SongSchema);

export default Song;
