import express from 'express'
import { authMiddleware, authIsAdmin } from '../middleware/auth.js'
import { addCustomerReview, getAllReviewCustomer } from '../controllers/customer.review.controller.js'
const customerReviewRoute = express.Router()

customerReviewRoute.post('/add-customer-review', authMiddleware, addCustomerReview);
customerReviewRoute.get('/get-all-customer-reviews', authMiddleware, authIsAdmin, getAllReviewCustomer);


export default customerReviewRoute