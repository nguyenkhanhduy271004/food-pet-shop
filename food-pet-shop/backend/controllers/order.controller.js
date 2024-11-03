import {
    placeOrderService,
    getUserOrdersService,
    listAllOrdersService,
    updateOrderStatusService
} from '../services/order.service.js';

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const response = await placeOrderService(userId, items, amount, address);
        if (response.success) {
            return res.status(201).json(response);
        }
        return res.status(400).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const response = await getUserOrdersService(userId);
        if (response.success) {
            return res.status(200).json(response);
        }
        return res.status(404).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const listOrders = async (req, res) => {
    try {
        const response = await listAllOrdersService();
        if (response.success) {
            return res.status(200).json(response);
        }
        return res.status(400).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const response = await updateOrderStatusService(orderId, status);
        if (response.success) {
            return res.status(200).json(response);
        }
        return res.status(400).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { placeOrder, userOrders, listOrders, updateStatus };
