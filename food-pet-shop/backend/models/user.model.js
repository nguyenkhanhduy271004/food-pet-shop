import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    access_token: { type: String, unique: true },
    refresh_token: { type: String, unique: true },
    isAdmin: { type: Boolean, default: false },
    wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }]
}, {
    timestamps: true,
    minimize: true
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema)
export default userModel