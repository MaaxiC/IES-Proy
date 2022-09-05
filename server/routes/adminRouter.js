import { Router } from "express";
import { Admin } from "../middlewares/admin.js";
import { ProductController } from "../controllers/index.js";

const adminRouter = Router();
const { getProducts, createProduct, updateProduct, deleteProduct } = ProductController;

adminRouter.get("/api/productos", getProducts);
adminRouter.post("/api/productos", Admin, createProduct);
adminRouter.put("/api/productos/:id", Admin, updateProduct);
adminRouter.delete("/api/productos/:id", Admin, deleteProduct);

export { adminRouter };