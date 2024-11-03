import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    images: { type: [String], required: true },
    isActive: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true,
})

const categoryModel = mongoose.models.category || mongoose.model('category', categorySchema)

export default categoryModel