import { Router } from "express";
import { Admin, validUser, validateEmpty } from "../middlewares/index.js";
import {
  signUp,
  signIn,
  registerFail,
  loginFail,
  validateSignIn,
} from "../controllers/index.js";
import passport from "passport";

const authRouter = Router();

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