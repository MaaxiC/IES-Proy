import { Router } from "express";
import { ProductController } from "../controllers/index.js";
import { Admin } from "../middlewares/index.js";

const productRouter = Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, updateStock } = ProductController;

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", Admin, createProduct);
productRouter.put("/:id", Admin, updateProduct);
productRouter.put("/:id/stock", Admin, updateStock);
productRouter.delete("/:id", Admin, deleteProduct);

export { productRouter };