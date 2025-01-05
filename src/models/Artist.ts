import mongoose, { Schema, Document } from 'mongoose';

export interface IRelatedArtist {
  name: string; //? Storing the name instead of ObjectId for related artists
  photoUrl: string;
  similarityScore?: number;
}

export interface IArtist extends Document {
  name: string;
  photoUrl: string;
  relatedArtists: IRelatedArtist[];
  createdAt: Date;
}

const RelatedArtistSchema = new Schema<IRelatedArtist>({
  name: { type: String, required: true }, //? Storing the name directly
  photoUrl: { type: String, required: true },
  similarityScore: { type: Number }
});

const ArtistSchema = new Schema<IArtist>({
  name: { type: String, required: true },
  photoUrl: { type: String, required: true },
  relatedArtists: [RelatedArtistSchema], //? Keeping the schema for related artists with name
  createdAt: { type: Date, default: Date.now }
});

const Artist = mongoose.models.Artist || mongoose.model<IArtist>('Artist', ArtistSchema);

export default Artist;
