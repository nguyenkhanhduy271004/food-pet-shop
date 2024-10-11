import customerReviewModel from "../models/customer.review.model.js";
import productModel from "../models/product.model.js";

const addCustomerReviewService = async (productName, rate, name, review) => {
    try {
        const newCustomerReview = new customerReviewModel({ productName, rate, name, review });
        await newCustomerReview.save();

        const product = await productModel.findOne({ name: productName });
        if (!product) {
            return { success: false, message: 'Product not found', statusCode: 404 };
        }

        const reviews = await customerReviewModel.find({ productName });
        const rateSum = reviews.reduce((total, review) => total + review.rate, 0);
        const averageRate = reviews.length > 0 ? rateSum / reviews.length : 0;

        product.rate = averageRate;
        await product.save();

        return { success: true, message: 'Added customer review successfully' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Server error', statusCode: 500 };
    }
};

const getAllReviewsService = async () => {
    try {
        const customerReviews = await customerReviewModel.find({}).lean();
        return { success: true, data: customerReviews };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Server error', statusCode: 500 };
    }
};

export { addCustomerReviewService, getAllReviewsService };
