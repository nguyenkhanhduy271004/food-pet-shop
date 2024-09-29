
import userModel from '../models/userModel.js'
import productModel from '../models/productModel.js'

const addToCart = async (req, res) => {
    try {
        const { userId, itemId, quantity } = req.body;

        let user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        let product = await productModel.findById(itemId);
        if (!product) {
            return res.json({ success: false, message: 'Product not found' });
        }

        if (quantity > product.stockQuantity) {
            return res.json({ success: false, message: 'Insufficient stock' });
        }

        let cartData = user.cartData || {};
        if (!cartData[itemId]) {
            cartData[itemId] = quantity;
        } else {
            cartData[itemId] += quantity;
        }

        await productModel.findByIdAndUpdate(itemId, { $inc: { stockQuantity: -quantity } });

        await userModel.findByIdAndUpdate(userId, { cartData });

        return res.json({ success: true, message: 'Added to cart' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};



const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);

        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }

        let cartData = userData.cartData;

        if (cartData[req.body.itemId] > 0) {
            // Retrieve current stock quantity of the product
            let product = await productModel.findById(req.body.itemId);
            if (!product) {
                return res.json({ success: false, message: 'Product not found' });
            }
            let stockQuantity = product.stockQuantity;
            let removedQuantity = cartData[req.body.itemId];

            cartData[req.body.itemId] = 0;

            await userModel.findByIdAndUpdate(req.body.userId, { cartData });
            await productModel.findByIdAndUpdate(req.body.itemId, { stockQuantity: stockQuantity + removedQuantity });

            res.json({ success: true, message: 'Removed from cart' });
        } else {
            res.json({ success: false, message: 'Item not in cart or quantity is zero' });
        }
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: 'Error' });
    }
};



const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId)
        const cartData = await userData.cartData
        res.json({ success: true, cartData })
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: 'Error' })
    }
}

export { addToCart, removeFromCart, getCart }