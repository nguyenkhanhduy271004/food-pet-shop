import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    stockQuantity: { type: Number, required: true },
    quantitySold: { type: Number, default: 0 },
    point: { type: Number, default: 0 },
    image: { type: [String], required: true },
    rate: { type: Number },
    options: { type: Array, default: [] }
})

const productModel = mongoose.models.product || mongoose.model('product', productSchema)

export default productModel