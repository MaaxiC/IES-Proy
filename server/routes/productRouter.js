import { Router } from "express";
import { ProductController } from "../controllers/index.js";

const productRouter = Router();
const { getProducts, getProductById } = ProductController;

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);

export { productRouter };