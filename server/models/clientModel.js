import mongoose from "mongoose";
import { config } from "../config/config.js";

const { Schema, model } = mongoose;

const ClientCollection = config.collection.clients;

const ClientSchema = new Schema(
  {
    nombre: { type: String, required: true, max: 100 },
    apellido: { type: String, required: true, max: 100 },
    dni: { type: Number, unique: true, required: true },
    email: { type: String, required: true, max: 100 },
  },
  {
    virtuals: true,
    timestamps: true,
  }
);

ClientSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response._id;
    return response;
  },
});

const ClientModel = model(ClientCollection, ClientSchema);

export { ClientModel, ClientSchema };