import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { addProduct, addBulkProducts, removeProduct, updateProduct, listProduct, addProductToWishList, getWishList, removeProductFromWishList } from '../controllers/product.controller.js'
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
productRoute.post('/addBulk', addBulkProducts);
productRoute.post('/remove', removeProduct)
productRoute.post('/update', upload.array('images', 10), updateProduct)
productRoute.get('/list', listProduct)
productRoute.post('/wish-list', authMiddleware, addProductToWishList)
productRoute.get('/wish-list', authMiddleware, getWishList)
productRoute.post('/wish-list-delete', authMiddleware, removeProductFromWishList);



export default productRoute