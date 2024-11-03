import mongoose from "mongoose"

const contactInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

const contactInfoModel = mongoose.models.contactInfo || mongoose.model('contactInfo', contactInfoSchema)

export default contactInfoModel