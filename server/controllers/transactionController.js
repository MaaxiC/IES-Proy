import { TransactionDao } from "../daos/index.js";
import { ERROR } from "../utils/index.js";

const TransactionApi = new TransactionDao()

class TransactionController {
  static async getTransactions(req, res) {
    try {
      const transactions = await TransactionApi.getAll();
      res.send(transactions);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async getTransactionById(req, res) {
    try {
      const transactionID = req.params.id;
      const transaction = await TransactionApi.getById(transactionID);
      if (!transaction || category.transaction)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_TRANSACTION });
      res.send(transaction);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }
}

export { TransactionController };