import { MongoContainer } from "../api/index.js";
import { config } from "../config/config.js";
import { StateSchema } from "../models/index.js";

class StateDao extends MongoContainer {
  constructor() {
    super({ collection: config.collection.states, schema: StateSchema });
  }
}

export { StateDao };