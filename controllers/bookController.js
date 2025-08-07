import Book from '../models/Book.js';

// Create
export async function createBook(req, res) {
    const data = req.body;
    if (req.file) data.coverUrl = `/uploads/${req.file.filename}`;
    const book = await Book.create(data);
    res.status(201).json(book);
}

// List w/ pagination, filter, search\
export async function getBooks(req, res) {
    const { page = 1, limit = 10, search, genre, author } = req.query;
    let filter = {};
    if (genre) filter.genre = genre;
    if (author) filter.author = author;
    if (search) filter.$text = { $search: search };

    const books = await Book.find(filter)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
    res.json(books);
}

// Single
export async function getBookById(req, res) {
    const book = await Book.findById(req.params.id);
    res.json(book);
}

// Update
export async function updateBook(req, res) {
    const data = req.body;
    if (req.file) data.coverUrl = `/uploads/${req.file.filename}`;
    const book = await Book.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(book);
}

// Delete
export async function deleteBook(req, res) {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
}