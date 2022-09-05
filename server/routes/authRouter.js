import { Router } from "express";
import { Admin } from "../middlewares/admin.js";
import { ProductController } from "../controllers/index.js";

const authRouter = Router();
const { createProduct, updateProduct, deleteProduct } = ProductController;

//Productos
authRouter.post("/api/productos", Admin, createProduct);
authRouter.put("/api/productos/:id", Admin, updateProduct);
authRouter.delete("/api/productos/:id", Admin, deleteProduct);

//usuarios
// authRouter.put("/api/iniciarsesion", signin);
// authRouter.post("/api/registrar", Admin, signup);

export { authRouter };