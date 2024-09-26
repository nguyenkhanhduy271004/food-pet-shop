import mongoose from 'mongoose';

const customerReviewSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    rate: { type: Number, required: true },
    name: { type: String, required: true },
    review: { type: String, required: true }
});

const customerReviewModel = mongoose.models.customerReview || mongoose.model('customerReview', customerReviewSchema);
export default customerReviewModel;
