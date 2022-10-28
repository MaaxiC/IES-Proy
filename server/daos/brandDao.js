import { MongoContainer } from "../api/index.js";
import { config } from "../config/config.js";
import { BrandSchema } from "../models/index.js";

class BrandDao extends MongoContainer {
  constructor() {
    super({ collection: config.collection.brands, schema: BrandSchema });
  }
}

export { BrandDao };