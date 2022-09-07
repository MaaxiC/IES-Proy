import { Router } from "express";
import { Admin } from "../middlewares/index.js"
import { getUsers } from "../controllers/index.js"

const userRouter = Router();

userRouter.get('/users', Admin, getUsers)
userRouter.delete('/users/:id', Admin, (req, res) => {
    res.json({message: "Borrar Usuario"})
})

export { userRouter }