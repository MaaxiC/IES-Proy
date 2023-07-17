import { MongoContainer } from "../api/index.js";
import { config } from "../config/config.js";
import { CategorySchema } from "../models/index.js";

class CategoryDao extends MongoContainer {
  constructor() {
    super({ collection: config.collection.categories, schema: CategorySchema });
  }
}

export { CategoryDao };