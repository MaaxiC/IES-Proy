import { MongoContainer } from "../api/index.js";
import { config } from "../config/config.js";
import { TransactionSchema } from "../models/index.js";

class TransactionDao extends MongoContainer {
  constructor() {
    super({ collection: config.collection.transactions, schema: TransactionSchema });
  }
}

export { TransactionDao };