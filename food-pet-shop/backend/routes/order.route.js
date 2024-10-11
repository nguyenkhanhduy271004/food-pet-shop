import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { listOrders, placeOrder, updateStatus, userOrders } from '../controllers/order.controller.js'

const orderRoute = express.Router()

orderRoute.post('/place', authMiddleware, placeOrder)
orderRoute.post('/userorders', authMiddleware, userOrders)
orderRoute.post('/update-status', updateStatus)
orderRoute.get('/list', listOrders)

export default orderRoute