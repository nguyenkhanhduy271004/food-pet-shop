import { placeOrderService, getUserOrdersService, listAllOrdersService, updateOrderStatusService } from '../services/order.service.js';

const placeOrder = async (req, res) => {
    const { userId, items, amount, address } = req.body;
    const response = await placeOrderService(userId, items, amount, address);
    return res.json(response);
};

const userOrders = async (req, res) => {
    const { userId } = req.body;
    const response = await getUserOrdersService(userId);
    return res.json(response);
};

const listOrders = async (req, res) => {
    const response = await listAllOrdersService();
    return res.json(response);
};

const updateStatus = async (req, res) => {
    const { orderId, status } = req.body;
    const response = await updateOrderStatusService(orderId, status);
    return res.json(response);
};

export { placeOrder, userOrders, listOrders, updateStatus };
