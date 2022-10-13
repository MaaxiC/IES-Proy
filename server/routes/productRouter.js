import { Router } from "express";
import { ProductController } from "../controllers/index.js";
import { Admin } from "../middlewares/index.js";

const productRouter = Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = ProductController;

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/productos", Admin, createProduct);
productRouter.put("/productos/:id", Admin, updateProduct);
productRouter.delete("/productos/:id", Admin, deleteProduct);

export { productRouter };