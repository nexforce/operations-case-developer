import express from "express";
import InventoryController from "../controllers/InventoryController";

const ProductRoutes = express();

ProductRoutes.get(
  "/filter",
  InventoryController.getProductsByCategoryAndRange
);
ProductRoutes.get("/", InventoryController.getProducts);
ProductRoutes.get("/:id", InventoryController.getProducts);
ProductRoutes.post("/", InventoryController.createProduct);
ProductRoutes.patch("/:id", InventoryController.updateProduct);
ProductRoutes.delete("/:id", InventoryController.deleteProduct);

export default ProductRoutes;
