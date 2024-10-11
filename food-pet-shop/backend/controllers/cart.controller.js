// cart.controller.js
import { addToCartService, removeFromCartService, getCartService } from '../services/cart.service.js';

const addToCart = async (req, res) => {
    const { userId, itemId, quantity } = req.body;
    const result = await addToCartService(userId, itemId, quantity);
    return res.json(result);
};

const removeFromCart = async (req, res) => {
    const { userId, itemId } = req.body;
    const result = await removeFromCartService(userId, itemId);
    return res.json(result);
};

const getCart = async (req, res) => {
    const { userId } = req.body;
    const result = await getCartService(userId);
    return res.json(result);
};

export { addToCart, removeFromCart, getCart };
