import { MongoContainer } from "../api/index.js";
import { config } from "../config/config.js";
import { CartSchema } from "../models/index.js";

class CartDao extends MongoContainer {
  constructor() {
    super({ collection: config.collection.carts, schema: CartSchema });
  }
}

export { CartDao };