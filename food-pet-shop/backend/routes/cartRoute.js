import express from "express"
import authMiddleware from '../middleware/auth.js'
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js"

const cartRoute = express.Router()

cartRoute.post('/add', authMiddleware, addToCart)
cartRoute.post('/remove', authMiddleware, removeFromCart)
cartRoute.post('/get', authMiddleware, getCart)

export default cartRoute