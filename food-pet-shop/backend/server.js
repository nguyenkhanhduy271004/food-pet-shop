import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import productRoute from './routes/product.route.js'
import userRoute from './routes/user.route.js'
import 'dotenv/config'
import cartRoute from './routes/cart.route.js'
import orderRoute from './routes/order.route.js'
import customerReviewRoute from './routes/customer.review.route.js'
import categoryRoute from './routes/category.route.js'
import contactInfoRoute from './routes/contact.info.route.js'
import { createVNPayPaymentUrl, vnpayReturn } from './controllers/payment.controller.js';



// app config
const app = express()
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:5174'
        ];
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));



//db connection
connectDB()

//api endpoints
app.use('/api/product', productRoute)
app.use('/api/user', userRoute)
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)
app.use('/api/reviews', customerReviewRoute)
app.use('/api/category', categoryRoute)
app.use('/api/contact-info', contactInfoRoute)
app.use('/images', express.static('uploads'))
app.post("/create-payment-url", createVNPayPaymentUrl);
app.get("/vnpay_return", vnpayReturn);

app.get('/', (req, res) => {
    res.send('Api Working')
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})