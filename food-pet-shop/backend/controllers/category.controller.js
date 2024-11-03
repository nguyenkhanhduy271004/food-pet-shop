import {
    addCategoryService,
    listCategoryService,
    findCategoryByIdService,
    updateCategoryService,
    removeCategoryService
} from "../services/category.service.js";

const addCategoryController = async (req, res) => {
    try {
        const response = await addCategoryService(req.body, req.files);
        if (response.success) {
            return res.status(201).json(response);
        }
        return res.status(400).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const listCategoryController = async (req, res) => {
    try {
        const response = await listCategoryService();
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const findCategoryByIdController = async (req, res) => {
    try {
        const response = await findCategoryByIdService(req.body);
        if (response.success) {
            return res.status(200).json(response);
        }
        return res.status(404).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const updateCategoryController = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const response = await updateCategoryService(categoryId, req.body.data, req.files, req.body.deletedImages);
        if (response.success) {
            return res.status(200).json(response);
        }
        return res.status(400).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const removeCategoryController = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const response = await removeCategoryService(categoryId);
        if (response.success) {
            return res.status(200).json(response);
        }
        return res.status(404).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export {
    addCategoryController,
    listCategoryController,
    findCategoryByIdController,
    removeCategoryController,
    updateCategoryController
};
