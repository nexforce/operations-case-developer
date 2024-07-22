const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const ProductController = require("../controllers/ProductController.js");

/* GET Categories */
router.get("/products/categories", ProductController.getAllCategories);

/* GET Filter Products By Category  */
router.get("/products/categories/:categoryName", ProductController.filterProductsByCategory);

/* GET Products */
router.get("/products", ProductController.getAllProducts);

/* GET Product By Id  */
router.get("/products/:productId", ProductController.getProductById);

/* DELETE Product */
router.delete("/products/:productId", ProductController.deleteProduct);

/* POST Product */
router.post(
    "/products",
    [
        body("title").isString().withMessage("Title must be a string").escape(),
        body("price").isNumeric().withMessage("Price must be a number"),
        body("stock").isNumeric().withMessage("Stock must be a number"),
        body("description").isString().withMessage("Description must be a string").escape(),
        body("categories").isArray().withMessage("Categories must be a array of string"),
        body("image").isURL().withMessage("Image URL must be a valid URL").custom((url) => {
            const imageExtensions = ["jpg", "jpeg", "png"];
            const extension = url.split(".").pop().toLowerCase();

            if (!imageExtensions.includes(extension)) {
                throw new Error("Invalid image format");
            }

            return true;
        }),
        body("rating.rate").isNumeric().withMessage("Rate must be a number"),
        body("rating.count").isNumeric().withMessage("Count must be a number"),
        body("rating").custom((value) => {
            if (!value.rate || !value.count) {
                return false;
            }
            return true;
        }),
    ],
    ProductController.createProduct
);

/* PATCH Product */
router.patch(
    "/products/:productId",
    [
        body("title").optional().isString().withMessage("Title must be a string").escape(),
        body("price").optional().isNumeric().withMessage("Price must be a number"),
        body("stock").optional().isNumeric().withMessage("Stock must be a number"),
        body("description").optional().isString().withMessage("Description must be a string").escape(),
        body("categories").optional().isArray().withMessage("Categories must be an array of strings"),
        body("image").optional().isURL().withMessage("Image URL must be a valid URL").custom((url) => {
            const imageExtensions = ["jpg", "jpeg", "png"];
            const extension = url.split(".").pop().toLowerCase();

            if (!imageExtensions.includes(extension)) {
                throw new Error("Invalid image format");
            }

            return true;
        }),
        body("rating.rate").optional().isNumeric().withMessage("Rate must be a number"),
        body("rating.count").optional().isNumeric().withMessage("Count must be a number"),
        body("rating").optional().custom((value) => {
            if (!value.rate || !value.count) {
                return false;
            }
            return true;
        }),
    ],
    ProductController.updateProduct
);


module.exports = router;
