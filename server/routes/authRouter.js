import { Router } from "express";
import { Admin, validUser, validateEmpty } from "../middlewares/index.js";
import {
  ProductController,
  signUp,
  signIn,
  registerFail,
  loginFail,
  validateSignIn,
} from "../controllers/index.js";
import passport from "passport";

const authRouter = Router();
const { createProduct, updateProduct, deleteProduct } = ProductController;

//Productos
authRouter.post("/productos", Admin, createProduct);
authRouter.put("/productos/:id", Admin, updateProduct);
authRouter.delete("/productos/:id", Admin, deleteProduct);

//usuarios
authRouter.post("/iniciarsesion", validateEmpty, validateSignIn, signIn);
authRouter.post(
  "/registrar",
  Admin,
  validUser,
  passport.authenticate("register", {
    failureRedirect: "/auth/api/registerfail",
  }),
  signUp
);
authRouter.get("/registerfail", registerFail);
authRouter.get("/loginfail", loginFail);

export { authRouter };