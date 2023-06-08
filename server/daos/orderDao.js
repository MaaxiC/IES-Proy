import { MongoContainer } from "../api/index.js";
import { config } from "../config/config.js";
import { OrderSchema } from "../models/index.js";

class OrderDao extends MongoContainer {
  constructor() {
    super({ collection: config.collection.orders, schema: OrderSchema });
  }
}

export { OrderDao };