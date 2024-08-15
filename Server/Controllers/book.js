"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBook = exports.UpdateBook = exports.AddBook = exports.DisplayBookById = exports.DisplayBookList = void 0;
const book_1 = __importDefault(require("../Models/book"));
const Util_1 = require("../Util");
function DisplayBookList(req, res, next) {
    book_1.default.find({})
        .then((data) => {
        res.status(200).json({ success: true, msg: "Book List Retrieved and Displayed", data: data, token: null });
    })
        .catch((err) => {
        console.error(err);
    });
}
exports.DisplayBookList = DisplayBookList;
function DisplayBookById(req, res, next) {
    let id = req.params.id;
    if (id.length != 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to retrieve a book", data: null, token: null });
    }
    else {
        book_1.default.findById({ _id: id })
            .then((data) => {
            if (data) {
                res.status(200).json({ success: true, msg: "One Book Retrieved and Displayed", data: data, token: null });
            }
            else {
                res.status(404).json({ success: false, msg: "Book not found", data: null, token: null });
            }
        })
            .catch((err) => {
            console.error(err);
        });
    }
}
exports.DisplayBookById = DisplayBookById;
function AddBook(req, res, next) {
    let genres = (req.body.genres) ? (0, Util_1.SanitizeArray)(req.body.genres) : (0, Util_1.SanitizeArray)("");
    let authors = (req.body.authors) ? (0, Util_1.SanitizeArray)(req.body.authors) : (0, Util_1.SanitizeArray)("");
    let newbook = new book_1.default({
        bookID: req.body.bookID,
        title: req.body.title,
        authors: authors,
        genres: genres,
        country: req.body.country,
        description: req.body.description,
        publicationDate: req.body.publicationDate,
        publisher: req.body.publisher,
        pageCount: req.body.pageCount,
        language: req.body.language,
        ISBN: req.body.ISBN,
        imageURL: req.body.imageURL
    });
    book_1.default.create(newbook)
        .then(() => {
        res.status(200).json({ success: true, msg: "New Book added", data: newbook, token: null });
    })
        .catch((err) => {
        console.error(err);
    });
}
exports.AddBook = AddBook;
function UpdateBook(req, res, next) {
    let id = req.params.id;
    if (id.length != 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to update a book", data: null, token: null });
    }
    else {
        let genres = (req.body.genres) ? (0, Util_1.SanitizeArray)(req.body.genres) : (0, Util_1.SanitizeArray)("");
        let authors = (req.body.authors) ? (0, Util_1.SanitizeArray)(req.body.authors) : (0, Util_1.SanitizeArray)("");
        let bookToUpdate = {
            _id: id,
            bookID: req.body.bookID,
            title: req.body.title,
            authors: authors,
            genres: genres,
            country: req.body.country,
            description: req.body.description,
            publicationDate: req.body.publicationDate,
            publisher: req.body.publisher,
            pageCount: req.body.pageCount,
            language: req.body.language,
            ISBN: req.body.ISBN,
            imageURL: req.body.imageURL
        };
        book_1.default.updateOne({ _id: id }, bookToUpdate)
            .then(() => {
            res.status(200).json({ success: true, msg: "Book updated", data: bookToUpdate, token: null });
        })
            .catch((err) => {
            console.error(err);
        });
    }
}
exports.UpdateBook = UpdateBook;
function DeleteBook(req, res, next) {
    let id = req.params.id;
    if (id.length != 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to delete a book", data: null, token: null });
    }
    else {
        book_1.default.deleteOne({ _id: id })
            .then(() => {
            res.status(200).json({ success: true, msg: "Book deleted", data: id, token: null });
        })
            .catch((err) => {
            console.error(err);
        });
    }
}
exports.DeleteBook = DeleteBook;
//# sourceMappingURL=book.js.map