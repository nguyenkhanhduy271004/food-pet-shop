import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    stockQuantity: { type: Number, required: true },
    image: { type: [String], required: true },
    rate: { type: Number },
    options: { type: Array, default: [] }
})

const productModel = mongoose.models.product || mongoose.model('product', productSchema)

export default productModel