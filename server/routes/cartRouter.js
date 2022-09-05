import { Router } from "express";
import { CartController } from "../controllers/index.js";

const cartRouter = Router();
const {
  createCart,
  deleteCart,
  getProductsInCart,
  addProductsInCart,
  deleteProductInCart,
} = CartController;

cartRouter.post("/", createCart);
cartRouter.delete("/:id", deleteCart);
cartRouter.get("/:id/productos", getProductsInCart);
cartRouter.post("/:id/productos", addProductsInCart);
cartRouter.delete("/:id/productos/:productID", deleteProductInCart);

export { cartRouter };