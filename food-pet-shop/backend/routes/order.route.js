import express from 'express'
import { authMiddleware, authIsAdmin } from '../middleware/auth.js'
import { listOrders, placeOrder, updateStatus, userOrders } from '../controllers/order.controller.js'

const orderRoute = express.Router()

orderRoute.post('/place', authMiddleware, placeOrder)
orderRoute.post('/userorders', authMiddleware, userOrders)
orderRoute.post('/update-status', authIsAdmin, updateStatus)
orderRoute.get('/list', authIsAdmin, listOrders)

export default orderRoute