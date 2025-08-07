import Book from '../models/Book.js';
import Review from '../models/Review.js';

// Add
export async function addReview(req, res) {
    const { rating, comment } = req.body;
    const review = await Review.create({
        user: req.user._id,
        book: req.params.id,
        rating, comment
    });

    // Update avg rating
    const stats = await Review.aggregate([
        { $match: { book: review.book } },
        { $group: { _id: '$book', avgRating: { $avg: '$rating' } } }
    ]);
    await Book.findByIdAndUpdate(review.book, { averageRating: stats[0].avgRating });
    res.status(201).json(review);
}

// List
export async function getReviews(req, res) {
    const reviews = await Review.find({ book: req.params.id })
        .populate('user', 'username');
    res.json(reviews);
}

// Update
export async function updateReview(req, res) {
    const review = await Review.findOneAndUpdate(
        { _id: req.params.reviewId, user: req.user._id },
        req.body,
        { new: true }
    );
    res.json(review);
}

// Delete
export async function deleteReview(req, res) {
    await Review.findOneAndDelete({ _id: req.params.reviewId, user: req.user._id });
    res.json({ message: 'Review deleted' });
}