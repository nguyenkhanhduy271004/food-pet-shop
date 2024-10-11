import userModel from '../models/user.model.js';
import productModel from '../models/product.model.js';

const addToCartService = async (userId, itemId, quantity) => {
    try {
        let user = await userModel.findById(userId);
        if (!user) {
            return { success: false, message: 'User not found' };
        }

        let product = await productModel.findById(itemId);
        if (!product) {
            return { success: false, message: 'Product not found' };
        }

        if (quantity > product.stockQuantity) {
            return { success: false, message: 'Insufficient stock' };
        }

        let cartData = user.cartData || {};
        if (!cartData[itemId]) {
            cartData[itemId] = quantity;
        } else {
            cartData[itemId] += quantity;
        }

        await productModel.findByIdAndUpdate(itemId, { $inc: { stockQuantity: -quantity } });
        await userModel.findByIdAndUpdate(userId, { cartData });

        return { success: true, message: 'Added to cart' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Server error' };
    }
};

const removeFromCartService = async (userId, itemId) => {
    try {
        let user = await userModel.findById(userId);
        if (!user) {
            return { success: false, message: 'User not found' };
        }

        let cartData = user.cartData;
        if (!cartData[itemId] || cartData[itemId] === 0) {
            return { success: false, message: 'Item not in cart or quantity is zero' };
        }

        let product = await productModel.findById(itemId);
        if (!product) {
            return { success: false, message: 'Product not found' };
        }

        let removedQuantity = cartData[itemId];
        cartData[itemId] = 0;

        await userModel.findByIdAndUpdate(userId, { cartData });
        await productModel.findByIdAndUpdate(itemId, { $inc: { stockQuantity: removedQuantity } });

        return { success: true, message: 'Removed from cart' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Server error' };
    }
};

const getCartService = async (userId) => {
    try {
        let user = await userModel.findById(userId);
        if (!user) {
            return { success: false, message: 'User not found' };
        }

        let cartData = user.cartData;
        return { success: true, cartData };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Server error' };
    }
};

export { addToCartService, removeFromCartService, getCartService };
