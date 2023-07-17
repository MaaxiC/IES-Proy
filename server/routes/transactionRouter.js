import { Router } from "express";
import { Admin } from "../middlewares/index.js";
import { TransactionController } from "../controllers/index.js";

const transactionRouter = Router();
const { getTransactions, getTransactionById } = TransactionController;

transactionRouter.get("/", getTransactions);
transactionRouter.get("/:id", getTransactionById);

export { transactionRouter };
