const ProductRepository = require("../repositories/ProductRepository.js");
const CategoryRepository = require("../repositories/CategoryRepository.js");

class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
        this.categoryRepository = new CategoryRepository();
    }

    async createProduct(productData) {
        try {
            const product = await this.productRepository.create(productData);

            const categories = await Promise.all(productData.categories.map(async (name) => {
                const category = await this.categoryRepository.model.findOrCreate({
                    where: { name: name },
                    defaults: { name: name }
                });
                return category[0];
            }));

            // Filter out undefined or null values in case findOrCreate didn't return a valid category
            const validCategoryIds = categories.filter(category => !!category.id).map(category => category.id);

            await product.setCategories(validCategoryIds)

            return product;
        } catch (error) {
            console.error("Failed to create product with categories:", error);
            throw error;
        }
    }

    async getAllProducts() {
        try {
            const products = await this.productRepository.getAll({
                include: [
                    {
                        model: this.categoryRepository.model,
                        as: "Categories",
                        attributes: ["id", "name"],
                    },
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            });
            return products;
        } catch (error) {
            console.error("Failed to fetch all products:", error);
            throw error;
        }
    }

    async getProductById(productId) {
        try {
            const product = await this.productRepository.getById(productId, {
                include: [
                    {
                        model: this.categoryRepository.model,
                        as: "Categories",
                        attributes: ["id", "name"],
                    },
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            });
            if (!product) {
                throw new Error("Product not found");
            }
            return product;
        } catch (error) {
            console.error(`Failed to fetch product with ID ${productId}:`, error);
            throw error;
        }
    }

    async deleteProduct(productId) {
        try {
            const rowsDeleted = await this.productRepository.delete(productId);
            if (rowsDeleted > 0) {
                return { success: true };
            } else {
                throw new Error("No product found with the provided ID.");
            }
        } catch (error) {
            console.error(`Failed to delete product with ID ${productId}:`, error);
            throw error;
        }
    }

    async updateProduct(productId, productData) {
        try {
            await this.productRepository.update(productId, productData);
            const product = await this.productRepository.getById(productId);

            const categories = await Promise.all(productData.categories.map(async (name) => {
                const category = await this.categoryRepository.model.findOrCreate({
                    where: { name: name },
                    defaults: { name: name }
                });
                return category[0];
            }));

            // Filter out undefined or null values in case findOrCreate didn't return a valid category
            const validCategoryIds = categories.filter(category => !!category.id).map(category => category.id);

            if (validCategoryIds.length > 0) {
                await product.setCategories([]);
                await product.addCategories(validCategoryIds);
            }

            return this.getProductById(productId);
        } catch (error) {
            console.error(`Failed to update product with ID ${productId}:`, error);
            throw error;
        }
    }
}

module.exports = ProductService;
