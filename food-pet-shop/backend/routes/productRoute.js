import express from 'express'
import { addProduct, removeProduct, updateProduct, listProduct } from '../controllers/productController.js'
import multer from 'multer'

const productRoute = express.Router()

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`,)
    }
})

const upload = multer({ storage: storage })

productRoute.post('/add', upload.array('images', 10), addProduct)
productRoute.post('/remove', removeProduct)
productRoute.post('/update', upload.array('images', 10), updateProduct)
productRoute.get('/list', listProduct)


export default productRoute