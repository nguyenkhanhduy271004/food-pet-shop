import {
    addProductService,
    addBulkProductsService,
    removeProductService,
    updateProductService,
    listProductService,
    addProductToWishListService,
    getWishListService,
    removeProductFromWishListService
} from '../services/product.service.js';

const addProduct = async (req, res) => {
    try {
        const response = await addProductService(req.body, req.files);
        if (response.success) {
            return res.status(201).json(response);
        }
        return res.status(400).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const addBulkProducts = async (req, res) => {
    try {
        const response = await addBulkProductsService(req.body.products);
        if (response.success) {
            return res.status(201).json(response);
        }
        return res.status(400).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const removeProduct = async (req, res) => {
    try {
        const response = await removeProductService(req.body.id);
        if (response.success) {
            return res.status(200).json(response);
        }
        return res.status(404).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const updateProduct = async (req, res) => {
    try {
        const response = await updateProductService(req.body.id, req.body.data, req.files, req.body.deletedImages);
        if (response.success) {
            return res.status(200).json(response);
        }
        return res.status(400).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const listProduct = async (req, res) => {
    try {
        const response = await listProductService();
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const addProductToWishList = async (req, res) => {
    const { userId, itemId } = req.body;
    try {
        const response = await addProductToWishListService(userId, itemId);
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getWishList = async (req, res) => {
    const { userId } = req.body;
    try {
        const response = await getWishListService(userId);
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const removeProductFromWishList = async (req, res) => {
    const { userId, itemId } = req.body;
    try {
        const response = await removeProductFromWishListService(userId, itemId);
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export {
    addProduct,
    addBulkProducts,
    removeProduct,
    updateProduct,
    listProduct,
    addProductToWishList,
    getWishList,
    removeProductFromWishList
};
