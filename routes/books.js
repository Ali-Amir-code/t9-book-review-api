import express from 'express';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';
import { createBook, getBooks, getBookById, updateBook, deleteBook } from '../controllers/bookController.js';

const router = express.Router();

router.route('/')
    .post(auth, upload.single('cover'), createBook)
    .get(getBooks);

router.route('/:id')
    .get(getBookById)
    .put(auth, upload.single('cover'), updateBook)
    .delete(auth, deleteBook);

export default router;