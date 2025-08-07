import express from 'express';
import auth from '../middlewares/auth.js';
import { addReview, getReviews, updateReview, deleteReview } from '../controllers/reviewController.js';

const router = express.Router();

router.route('/:id/reviews')
  .post(auth, addReview)
  .get(getReviews);

router.route('/:reviewId')
  .put(auth, updateReview)
  .delete(auth, deleteReview);

export default router;