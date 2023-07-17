import { MongoContainer } from "../api/index.js";
import { config } from "../config/config.js";
import { ProductSchema } from "../models/index.js";

class ProductDao extends MongoContainer {
  constructor() {
    super({ collection: config.collection.products, schema: ProductSchema });
  }
}

export { ProductDao };