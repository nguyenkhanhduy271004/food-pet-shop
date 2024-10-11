import { addCustomerReviewService, getAllReviewsService } from '../services/customer.review.service.js';

const addCustomerReview = async (req, res) => {
    const { productName, rate, name, review } = req.body;
    const response = await addCustomerReviewService(productName, rate, name, review);

    return res.status(response.statusCode || 200).json(response);
};

const getAllReviewCustomer = async (req, res) => {
    const response = await getAllReviewsService();
    return res.status(response.statusCode || 200).json(response);
};

export { addCustomerReview, getAllReviewCustomer };
