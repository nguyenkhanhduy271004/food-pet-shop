import customerReviewModel from "../models/customerReviewModel.js";
import productModel from "../models/productModel.js";

const addCustomerReview = async (req, res) => {
    try {
        const { productName, rate, name, review } = req.body;

        const newCustomerReview = new customerReviewModel({ productName, rate, name, review });
        await newCustomerReview.save();

        const product = await productModel.findOne({ name: productName });
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const reviews = await customerReviewModel.find({ productName });
        const rateSum = reviews.reduce((total, review) => total + review.rate, 0);
        const averageRate = reviews.length > 0 ? rateSum / reviews.length : 0;

        product.rate = averageRate;
        await product.save();

        res.status(200).json({ success: true, message: 'Added customer review successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error' });
    }
}


const getAllReviewCustomer = async (req, res) => {
    try {
        const customerReviews = await customerReviewModel.find({}).lean();
        res.status(200).json({ success: true, data: customerReviews });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}


export { addCustomerReview, getAllReviewCustomer }