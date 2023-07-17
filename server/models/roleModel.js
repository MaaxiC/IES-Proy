import mongoose from "mongoose";
import { config } from "../config/config.js";

const { Schema, model } = mongoose;

const RoleCollection = config.collection.roles;

const RoleSchema = new Schema(
  {
    nombre: { type: String, required: true, max: 100 },
  },
  {
    virtuals: true,
  }
);

RoleSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response._id;
    return response;
  },
});

const RoleModel = model(RoleCollection, RoleSchema);

export { RoleModel, RoleSchema };