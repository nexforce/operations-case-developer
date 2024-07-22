const { validationResult } = require("express-validator");
const ProductService = require("../services/ProductService.js");

const productService = new ProductService();

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getProductById = async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await productService.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).send(error.message); // Not Found
    }
};

exports.deleteProduct = async (req, res) => {
    const productId = req.params.productId;
    try {
        const deletedProduct = await productService.deleteProduct(productId);
        res.json(deletedProduct);
    } catch (error) {
        res.status(404).send(error.message); // Not Found
    }
};

exports.createProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are validation errors, return them in the response
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product); // 201 Created
    } catch (error) {
        res.status(400).send(error.message); // Bad Request
    }
};

exports.updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are validation errors, return them in the response
        return res.status(400).json({ errors: errors.array() });
    }
    const productId = req.params.productId;
    try {
        const updatedProduct = await productService.updateProduct(productId, req.body);
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).send(error.message); // Bad Request
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await productService.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.filterProductsByCategory = async (req, res) => {
    const categoryName = req.params.categoryName;
    try {
        const filteredProducts = await productService.filterProductsByCategory(categoryName);
        res.json(filteredProducts);
    } catch (error) {
        res.status(404).send(error.message); // Not Found
    }
};
