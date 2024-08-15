"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let bookSchema = new mongoose_1.Schema({
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
let Book = (0, mongoose_1.model)('Book', bookSchema);
exports.default = Book;
//# sourceMappingURL=book.js.map