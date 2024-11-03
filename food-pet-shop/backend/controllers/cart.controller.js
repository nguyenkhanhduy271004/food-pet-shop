import { addToCartService, removeFromCartService, getCartService } from '../services/cart.service.js';

const addToCart = async (req, res) => {
    const { userId, itemId, quantity } = req.body;
    try {
        const result = await addToCartService(userId, itemId, quantity);
        if (result.success) {
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const removeFromCart = async (req, res) => {
    const { userId, itemId } = req.body;
    try {
        const result = await removeFromCartService(userId, itemId);
        if (result.success) {
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getCart = async (req, res) => {
    const { userId } = req.body;
    try {
        const result = await getCartService(userId);
        if (result.success) {
            return res.status(200).json(result);
        }
        return res.status(404).json({ success: false, message: "Cart not found" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { addToCart, removeFromCart, getCart };
