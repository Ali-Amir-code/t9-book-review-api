import { Schema, model } from 'mongoose';

const BookSchema = new Schema({
  title:         { type: String, required: true, text: true },
  author:        { type: String, required: true, text: true },
  genre:         String,
  description:   String,
  ISBN:          String,
  coverUrl:      String,
  averageRating: { type: Number, default: 0 },
}, { timestamps: true });

BookSchema.index({ title: 'text', author: 'text' });
export default model('Book', BookSchema);