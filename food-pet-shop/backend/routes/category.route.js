import express from 'express';
import multer from 'multer';

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

categoryRoute.post('/add-category', upload.array('images', 1), addCategoryController);
categoryRoute.get('/list-category', listCategoryController);
categoryRoute.get('/category-by-id/:categoryId', findCategoryByIdController);
categoryRoute.put('/update-category/:categoryId', upload.array('images', 1), updateCategoryController);
categoryRoute.delete('/delete-category/:categoryId', removeCategoryController);

export default categoryRoute;
