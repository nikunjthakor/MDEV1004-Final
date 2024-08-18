/**
 *  book.ts
 * Name:- Nikunj Thakor
 * StudentId:- 20055644
 * Date:- 17-08-2024
 */
import express from 'express';
const router = express.Router();

import { AddBook, DeleteBook, DisplayBookById, DisplayBookList, UpdateBook } from '../Controllers/book';
import passport from 'passport';

/* Endpoints */

/* GET Book List */
router.get('/list', (req, res, next) => { DisplayBookList(req, res, next); });

/* GET Book by ID */
router.get('/:id', (req, res, next) => { DisplayBookById(req, res, next); });

/* Add New Book */
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res, next) => { AddBook(req, res, next); });

/* Update Book */
router.put('/update/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {  UpdateBook(req, res, next); });

/* Delete Book */
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {  DeleteBook(req, res, next); });

export default router;
