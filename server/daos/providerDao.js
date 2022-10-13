import { MongoContainer } from "../api/index.js";
import { config } from "../config/config.js";
import { ProviderSchema } from "../models/index.js";

class ProviderDao extends MongoContainer {
  constructor() {
    super({ collection: config.collection.providers, schema: ProviderSchema });
  }
}

export { ProviderDao };