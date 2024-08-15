"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const book_1 = require("../Controllers/book");
const passport_1 = __importDefault(require("passport"));
router.get('/list', (req, res, next) => { (0, book_1.DisplayBookList)(req, res, next); });
router.get('/:id', (req, res, next) => { (0, book_1.DisplayBookById)(req, res, next); });
router.post('/add', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => { (0, book_1.AddBook)(req, res, next); });
router.put('/update/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => { (0, book_1.UpdateBook)(req, res, next); });
router.delete('/delete/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => { (0, book_1.DeleteBook)(req, res, next); });
exports.default = router;
//# sourceMappingURL=book.js.map