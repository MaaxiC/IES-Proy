import { MongoContainer } from "../api/index.js";
import { config } from "../config/config.js";
import { UserSchema } from "../models/index.js";

class UserDao extends MongoContainer {
  constructor() {
    super({ collection: config.collection.users, schema: UserSchema });
  }

  async getAll() {
    return await this.collection.find({}, { "password": 0 });
  }

  async getById(id) {
    try {
      return await this.collection.findById(id, { "password": 0 });
    } catch (error) {
      return error;
    }
  }

  async updateById(id, data) {
    try {
      const response = await this.collection.findByIdAndUpdate(id, data, {
        fields: { "password": 0 },
        new: true,
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}

export { UserDao };