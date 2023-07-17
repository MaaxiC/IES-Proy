import { Router } from "express";
import { OrderController } from "../controllers/index.js";

const orderRouter = Router();
const { getOrders, getOrdersFromUser, getOrderById, createOrder, updateOrder, getQuantitySales, getTotalSales } = OrderController;

orderRouter.get("/", getOrders);
orderRouter.get("/quantitySales", getQuantitySales);
orderRouter.get("/amountSales", getTotalSales);
orderRouter.get("/user/:dni", getOrdersFromUser);
orderRouter.get("/:id", getOrderById);
orderRouter.post("/", createOrder);
orderRouter.put("/:id", updateOrder);

export { orderRouter };