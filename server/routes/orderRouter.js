import { Router } from "express";
import { OrderController } from "../controllers/index.js";

const orderRouter = Router();
const { getOrders, getOrderById, createOrder, updateOrder } = OrderController;

orderRouter.get("/", getOrders);
orderRouter.get("/:id", getOrderById);
orderRouter.post("/", createOrder);
orderRouter.put("/:id", updateOrder);

export { orderRouter };