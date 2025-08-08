import dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'

import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';
import booksRoutes from './routes/books.js';
import reviewsRoutes from './routes/reviews.js';

connectDB();

const app = express();

app.use(cors());
app.use(json());

app.use('/uploads', express.static(join(dirname(fileURLToPath(import.meta.url)), 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/books', reviewsRoutes);

app.get('/', (req, res) => res.json({ msg: 'Hello from Book Review API!' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));