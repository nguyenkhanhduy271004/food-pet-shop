// order.service.js
import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js";
import userModel from "../models/user.model.js";

const placeOrderService = async (userId, items, amount, address) => {
    try {
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address
        });

        await Promise.all(items.map(async (item) => {
            const product = await productModel.findById(item._id);
            if (product) {
                let newStockQuantity;
                if (product.stockQuantity === 1) {
                    newStockQuantity = 0;
                } else {
                    newStockQuantity = product.stockQuantity - item.quantity;
                }

                const currentQuantitySold = Number(product.quantity) || 0;
                const currentItemQuantity = Number(item.quantity) || 0;

                const quantitySold = currentQuantitySold + currentItemQuantity;

                await productModel.findByIdAndUpdate(item._id, { stockQuantity: newStockQuantity, quantitySold: quantitySold });
            }
        }));


        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        return { success: true, message: 'Order created successfully' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error creating order', error };
    }
};

const getUserOrdersService = async (userId) => {
    try {
        const orders = await orderModel.find({ userId });
        return { success: true, data: orders };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error fetching user orders', error };
    }
};

const listAllOrdersService = async () => {
    try {
        const orders = await orderModel.find({});
        return { success: true, data: orders };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error fetching all orders', error };
    }
};

const updateOrderStatusService = async (orderId, status) => {
    try {
        await orderModel.findByIdAndUpdate(orderId, { status });
        return { success: true, message: 'Order status updated' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error updating order status', error };
    }
};

export { placeOrderService, getUserOrdersService, listAllOrdersService, updateOrderStatusService };
