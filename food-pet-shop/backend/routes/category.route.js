import express from 'express';
import multer from 'multer';
import { authIsAdmin } from '../middleware/auth.js';
import {
    addCategoryController, listCategoryController,
    findCategoryByIdController, updateCategoryController,
    removeCategoryController
} from '../controllers/category.controller.js';

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const categoryRoute = express.Router();
const upload = multer({ storage: storage });

categoryRoute.post('/add-category', authIsAdmin, upload.array('images', 1), addCategoryController);
categoryRoute.get('/list-category', authIsAdmin, listCategoryController);
categoryRoute.get('/category-by-id/:categoryId', authIsAdmin, findCategoryByIdController);
categoryRoute.post('/update-category/:categoryId', authIsAdmin, upload.array('images', 1), updateCategoryController);
categoryRoute.delete('/delete-category/:categoryId', authIsAdmin, removeCategoryController);

export default categoryRoute;
