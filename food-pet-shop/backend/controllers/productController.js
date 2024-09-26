import { log } from "console";
import productModel from "../models/productModel.js";
import fs from 'fs'

const addProduct = async (req, res) => {

    let image_filenames = req.files.map(file => file.filename)

    const product = new productModel({
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        subCategory: req.body.subCategory,
        stockQuantity: req.body.stockQuantity,
        image: image_filenames,
        rate: 5
    })

    try {
        await product.save()
        res.json({ success: true, message: 'Product addded' })
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: 'Error' })
    }

}

const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id)
        fs.unlink(`uploads/${product.image}`, () => { })

        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: 'Cafe Removed' })
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: 'Error' })
    }
}

const updateProduct = async (req, res) => {
    let image_filenames = req.files ? req.files.map(file => file.filename) : [];
    const { id, data, deletedImages } = req.body;

    if (!id || !data) {
        return res.status(400).json({ success: false, message: 'Invalid input' });
    }

    try {
        const existingProduct = await productModel.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        if (deletedImages && Array.isArray(deletedImages)) {
            deletedImages.forEach(filename => fs.unlink(`uploads/${filename}`, err => {
                if (err) console.error(`Failed to delete ${filename}: ${err}`);
            }));
        }

        await productModel.findByIdAndUpdate(id, {
            name: data.name,
            brand: data.brand,
            price: Number(data.price),
            category: data.category,
            subCategory: data.subCategory,
            stockQuantity: Number(data.stockQuantity),
            image: [...existingProduct.image, ...image_filenames],
        });

        res.json({ success: true, message: 'Product updated' });
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ success: false, message: 'Error updating product' });
    }
};



const listProduct = (req, res) => {
    productModel.find({})
        .then((products) => {
            res.json({ success: true, data: products });
        })
        .catch((err) => {
            console.log(err);
            res.json({ success: false, message: 'Error' });
        });
};


export { addProduct, removeProduct, updateProduct, listProduct }