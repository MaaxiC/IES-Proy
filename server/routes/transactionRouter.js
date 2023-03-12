import { Router } from "express";
import { Admin } from "../middlewares/index.js";
import { TransactionController } from "../controllers/index.js";

const transactionRouter = Router();
const { getTransactions, getTransactionById } = TransactionController;

transactionRouter.get("/", Admin, getTransactions);
transactionRouter.get("/:id", Admin, getTransactionById);

export { transactionRouter };
