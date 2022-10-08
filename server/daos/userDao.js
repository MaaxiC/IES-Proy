import { MongoContainer } from "../api/index.js";
import { config } from "../config/config.js";
import { UserSchema } from "../models/index.js";

class UserDao extends MongoContainer {
  constructor() {
    super({ collection: config.collection.users, schema: UserSchema });
  }
  async getAll() {
    return await this.collection.find({}, {"password":0});
  }
}

export { UserDao };