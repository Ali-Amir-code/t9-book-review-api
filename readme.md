# Book Review Platform RESTful API

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Books](#books)
  - [Reviews](#reviews)
- [Usage Examples](#usage-examples)
- [Core Features](#core-features)
- [Models](#models)
- [Middlewares](#middlewares)
- [Postman Collection](#postman-collection)
- [Next Steps & Customizations](#next-steps--customizations)
- [License](#license)

## Overview

This RESTful API allows users to register, manage books, and submit reviews with ratings. It supports full CRUD operations on books and reviews, JWT-based authentication, pagination, filtering, full-text search, and cover image uploads.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT)
- **File Uploads:** Multer
- **Language:** JavaScript (ES6+)

## Directory Structure

```bash
book-review-api/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   └── reviewController.js
├── middlewares/
│   ├── auth.js
│   └── upload.js
├── models/
│   ├── User.js
│   ├── Book.js
│   └── Review.js
├── routes/
│   ├── auth.js
│   ├── books.js
│   └── reviews.js
├── uploads/             # Book cover images
├── .env                 # Environment variables
├── .gitignore
├── package.json
└── server.js            # Express server
```

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/ali-amir-code/t9-book-review-api.git
   cd t9-book-review-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root:

   ```env
   MONGO_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret>
   PORT=5000
   ```

4. **Add `.gitignore`**

   ```gitignore
   node_modules/
   .env
   uploads/
   ```

## Environment Variables

- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for signing JWTs.
- `PORT`: Port to run the server (default `5000`).

## Running the App

- **Development:** `npm run dev` (uses nodemon)
- **Production:** `npm start`

## API Endpoints

### Authentication

| Method | Endpoint             | Auth | Description           |
| ------ | -------------------- | ---- | --------------------- |
| POST   | `/api/auth/register` | No   | Register a new user   |
| POST   | `/api/auth/login`    | No   | Login and receive JWT |

### Books

| Method | Endpoint         | Auth | Description                             |
| ------ | ---------------- | ---- | --------------------------------------- |
| POST   | `/api/books`     | Yes  | Create a book (cover via `cover` field) |
| GET    | `/api/books`     | No   | List books (filter, pagination, search) |
| GET    | `/api/books/:id` | No   | Get book details                        |
| PUT    | `/api/books/:id` | Yes  | Update book (optional cover upload)     |
| DELETE | `/api/books/:id` | Yes  | Delete a book                           |

### Reviews

| Method | Endpoint                 | Auth | Description                |
| ------ | ------------------------ | ---- | -------------------------- |
| POST   | `/api/books/:id/reviews` | Yes  | Add a review to a book     |
| GET    | `/api/books/:id/reviews` | No   | Get all reviews for a book |
| PUT    | `/api/reviews/:reviewId` | Yes  | Edit own review            |
| DELETE | `/api/reviews/:reviewId` | Yes  | Delete own review          |

## Usage Examples

### Register & Login

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"username":"john","email":"john@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"john@example.com","password":"pass123"}'
```

### Create a Book

```bash
curl -X POST http://localhost:5000/api/books \
  -H 'Authorization: Bearer <token>' \
  -F 'title=My Book' \
  -F 'author=Author Name' \
  -F 'genre=Fiction' \
  -F 'cover=@/path/to/cover.jpg'
```

### Get Books with Pagination

```bash
curl http://localhost:5000/api/books?page=1&limit=5&search=My
```

## Core Features

- **Pagination & Filtering**: Query params `page`, `limit`, `genre`, `author`, `search`.
- **Full-Text Search**: MongoDB text indexes on title & author.
- **Average Rating**: Calculated on review creation and updates.
- **Cover Uploads**: Upload via `multipart/form-data`.
- **JWT Authentication**: Protects all write routes.

## Models

- **User**: `username`, `email`, `password` (hashed).
- **Book**: `title`, `author`, `genre`, `description`, `ISBN`, `coverUrl`, `averageRating`.
- **Review**: `book` (ref), `user` (ref), `rating` (1–5), `comment`.

## Middlewares

- **auth.js**: JWT validation middleware, attaches `req.user`.
- **upload.js**: Multer configuration for handling cover image uploads.

## Postman Collection

Use the `postman_collection` file in Postman app for a ready-to-use Postman collection of requests.

## Next Steps & Customizations

- Input validation using **Joi** or **express-validator**.
- Centralized error-handling middleware.
- Containerization with **Docker** & **docker-compose**.
- API documentation via **Swagger**.
- Integration tests with **Jest** or **Mocha**.

## License

MIT © Ali Amir
