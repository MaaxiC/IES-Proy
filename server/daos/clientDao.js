import { MongoContainer } from "../api/index.js";
import { config } from "../config/config.js";
import { ClientSchema } from "../models/index.js";

class ClientDao extends MongoContainer {
  constructor() {
    super({ collection: config.collection.clients, schema: ClientSchema });
  }
}

export { ClientDao };