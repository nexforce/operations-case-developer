import express from "express";
import ProductRoutes from "./products.routes";

const APP_ROUTER = express();

APP_ROUTER.use("/products",ProductRoutes);

export default APP_ROUTER;