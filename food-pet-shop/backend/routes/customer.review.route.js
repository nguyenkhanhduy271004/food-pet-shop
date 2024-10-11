import express from 'express'
import { addCustomerReview, getAllReviewCustomer } from '../controllers/customer.review.controller.js'
const customerReviewRoute = express.Router()

customerReviewRoute.post('/add-customer-review', addCustomerReview);
customerReviewRoute.get('/get-all-customer-reviews', getAllReviewCustomer);


export default customerReviewRoute