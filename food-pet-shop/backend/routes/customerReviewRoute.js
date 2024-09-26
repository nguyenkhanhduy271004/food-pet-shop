import express from 'express'
import { addCustomerReview, getAllReviewCustomer } from '../controllers/customerReviewController.js'
const customerReviewRoute = express.Router()

customerReviewRoute.post('/add-customer-review', addCustomerReview);
customerReviewRoute.get('/get-all-customer-reviews', getAllReviewCustomer);


export default customerReviewRoute