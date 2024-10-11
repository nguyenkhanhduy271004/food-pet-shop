import { addProductService, addBulkProductsService, removeProductService, updateProductService, listProductService } from '../services/product.service.js';

const addProduct = async (req, res) => {
    const response = await addProductService(req.body, req.files);
    return res.json(response);
};

const addBulkProducts = async (req, res) => {
    const response = await addBulkProductsService(req.body.products);
    return res.json(response);
};

const removeProduct = async (req, res) => {
    const response = await removeProductService(req.body.id);
    return res.json(response);
};

const updateProduct = async (req, res) => {
    const response = await updateProductService(req.body.id, req.body.data, req.files, req.body.deletedImages);
    return res.json(response);
};

const listProduct = async (req, res) => {
    const response = await listProductService();
    return res.json(response);
};

export { addProduct, addBulkProducts, removeProduct, updateProduct, listProduct };
