import productModel from "../models/productModel.js"
import orderModel from "../models/orderModel.js"
import userModel from '../models/userModel.js'

const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        await Promise.all(newOrder.items.map(async (item) => {
            const product = await productModel.findById(item._id);
            if (product) {
                const newStockQuantity = product.stockQuantity - item.quantity;
                await productModel.findByIdAndUpdate(item._id, { stockQuantity: newStockQuantity });
            }
        }));

        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })
        res.json({ success: true, message: 'Order created successfully' })
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: 'Error' })
    }
}

const userOrders = async (req, res) => {
    const userId = req.body.userId
    try {
        const orders = await orderModel.find({ userId: userId })
        res.json({ success: true, data: orders })
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: 'Error' })
    }
}

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, data: orders })
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: 'Error' })
    }
}

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ success: true, message: 'Status updated' })
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: 'Error' })
    }
}

export { placeOrder, userOrders, listOrders, updateStatus }