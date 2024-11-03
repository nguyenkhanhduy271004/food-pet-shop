import { log } from "console";
import categoryModel from "../models/category.model.js";
import fs from 'fs';

const addCategoryService = async (categoryData, imageFiles) => {
    let image_filenames = imageFiles.map(file => file.filename);

    const category = new categoryModel({
        ...categoryData,
        images: image_filenames,
    });

    try {
        await category.save();
        return { success: true, message: 'Category added' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error adding category' };
    }
};

const listCategoryService = async () => {
    try {
        const categories = await categoryModel.find({});
        return { success: true, data: categories };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error fetching categories' };
    }
};

const findCategoryByIdService = async (categoryId) => {
    try {
        const category = await categoryModel.findById(categoryId);
        if (category) {
            return { success: true, message: 'Category found', category: category };
        } else {
            return { success: false, message: 'Category not found' };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: "Error" };
    }
};

const updateCategoryService = async (id, data, imageFiles, deletedImages) => {
    let image_filenames = imageFiles ? imageFiles.map(file => file.filename) : [];

    if (!id || !data) {

        return { success: false, message: 'Invalid input' };
    }

    try {
        const existingCategory = await categoryModel.findById(id);
        if (!existingCategory) {
            return { success: false, message: 'Category not found' };
        }

        const currentImages = Array.isArray(existingCategory.images) ? existingCategory.images : [];

        if (deletedImages && Array.isArray(deletedImages)) {
            deletedImages.forEach(filename => fs.unlink(`uploads/${filename}`, err => {
                if (err) console.error(`Failed to delete ${filename}: ${err}`);
            }));
        }

        await categoryModel.findByIdAndUpdate(id, {
            ...data,
            images: [
                ...currentImages.filter(img => !deletedImages.includes(img)),
                ...image_filenames
            ],
        });

        return { success: true, message: 'Category updated' };
    } catch (error) {
        console.error('Error updating category:', error);
        return { success: false, message: 'Error updating category' };
    }
};



const removeCategoryService = async (categoryId) => {
    try {
        const category = await categoryModel.findById(categoryId);
        if (!category) {
            return { success: false, message: 'Category not found' };
        }
        if (Array.isArray(category.images)) {
            category.images.forEach(filename => {
                fs.unlink(`uploads/${filename}`, err => {
                    if (err) console.error(`Failed to delete ${filename}: ${err}`);
                });
            });
        } else {
            console.warn('Category images is not an array or is undefined.');
        }

        await categoryModel.findByIdAndDelete(categoryId);
        return { success: true, message: 'Category removed' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error removing category' };
    }
};

export { addCategoryService, removeCategoryService, updateCategoryService, listCategoryService, findCategoryByIdService };
