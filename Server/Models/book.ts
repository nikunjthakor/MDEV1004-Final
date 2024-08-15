//Book Model

import { Collection, Schema, model } from 'mongoose';

// Book interface 
interface IBook 
{
  bookID: string;
  title: string;
  authors: string[];
  genres: string[];
  country: string;
  description: string;
  publicationDate: string;
  publisher: string;
  pageCount: number;
  language: string;
  ISBN: string;
  imageURL: string;
}

// Book schema 
let bookSchema = new Schema<IBook>
({
  bookID: String,
  title: String,
  authors: [String],
  genres: [String],
  country: String,
  description: String,
  publicationDate: String,
  publisher: String,
  pageCount: Number,
  language: String,
  ISBN: String,
  imageURL: String,
});


let Book = model<IBook>('Book', bookSchema);

export default Book;