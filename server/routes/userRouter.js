import { Router } from "express";
import { Admin } from "../middlewares/index.js"
import { getUsers, changeActiveUser, updateUser, getUserById } from "../controllers/index.js"

const userRouter = Router();

userRouter.get('/', Admin, getUsers);
userRouter.get('/:id', Admin, getUserById);
userRouter.put('/activo/:id', Admin, changeActiveUser)
userRouter.put('/:id', Admin, updateUser)

export { userRouter }