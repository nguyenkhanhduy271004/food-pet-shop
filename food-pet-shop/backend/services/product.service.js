import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
import userModel from "../models/user.model.js";
import fs from 'fs';

const addProductService = async (productData, imageFiles) => {
    let image_filenames = imageFiles.map(file => file.filename);

    const category = await categoryModel.findOne({ name: productData.category });
    if (!category) {
        console.error('Category not found');
        return;
    }


    const product = new productModel({
        ...productData,
        category: category._id,
        image: image_filenames,
        rate: 5
    });

    try {
        await product.save();
        return { success: true, message: 'Product added' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error adding product' };
    }
};

const addBulkProductsService = async (products) => {
    if (!products || !Array.isArray(products)) {
        return { success: false, message: "Invalid input" };
    }

    try {
        const productPromises = products.map(product => {
            const newProduct = new productModel({
                ...product,
                image: [],
                rate: 5
            });
            return newProduct.save();
        });

        await Promise.all(productPromises);
        return { success: true, message: 'Products added successfully' };
    } catch (error) {
        console.error('Error adding products:', error);
        return { success: false, message: 'Error adding products' };
    }
};

const removeProductService = async (productId) => {
    try {
        const product = await productModel.findById(productId);
        fs.unlink(`uploads/${product.image}`, () => { });

        await productModel.findByIdAndDelete(productId);
        return { success: true, message: 'Product removed' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error removing product' };
    }
};

const updateProductService = async (id, data, imageFiles, deletedImages) => {
    let image_filenames = imageFiles ? imageFiles.map(file => file.filename) : [];

    if (!id || !data) {
        return { success: false, message: 'Invalid input' };
    }

    try {
        const existingProduct = await productModel.findById(id);
        if (!existingProduct) {
            return { success: false, message: 'Product not found' };
        }

        if (deletedImages && Array.isArray(deletedImages)) {
            deletedImages.forEach(filename => fs.unlink(`uploads/${filename}`, err => {
                if (err) console.error(`Failed to delete ${filename}: ${err}`);
            }));
        }

        await productModel.findByIdAndUpdate(id, {
            ...data,
            image: [...existingProduct.image, ...image_filenames],
        });

        return { success: true, message: 'Product updated' };
    } catch (error) {
        console.error('Error updating product:', error);
        return { success: false, message: 'Error updating product' };
    }
};

const listProductService = async () => {
    try {
        const products = await productModel.find({});
        return { success: true, data: products };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error fetching products' };
    }
};

const addProductToWishListService = async (_id, prodId) => {
    try {
        const user = await userModel.findById(_id);
        if (!user) {
            throw new Error('User not found');
        }

        const alreadyAdded = user.wishList.find((id) => id.toString() === prodId);

        if (!alreadyAdded) {
            const updatedUser = await userModel.findByIdAndUpdate(
                _id,
                { $push: { wishList: prodId } },
                { new: true }
            ).select('-password');
            return { success: true, data: updatedUser }
        } else {
            console.log("Product is already in the wishlist.");
            return { success: false, message: "Product is already in the wishlist." };
        }
    } catch (error) {
        throw new Error(error);
    }
};

const getWishListService = async (userId) => {

    try {
        const user = await userModel.findById(userId).populate('wishList');;
        if (!user) {
            return { success: false, message: 'User not found' };
        }

        return { success: true, products: user.wishList };
    } catch (error) {
        throw new Error(error);

    }
}

const removeProductFromWishListService = async (userId, itemId) => {
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const alreadyInWishlist = user.wishList.includes(itemId);
        if (!alreadyInWishlist) {
            return { message: "Product is not in the wishlist." };
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $pull: { wishList: itemId } },
            { new: true }
        ).select('-password');

        return { success: true, data: updatedUser }
    } catch (error) {
        throw new Error(error);
    }
};



export {
    addProductService, addBulkProductsService,
    removeProductService, updateProductService,
    listProductService, addProductToWishListService,
    getWishListService, removeProductFromWishListService
};
