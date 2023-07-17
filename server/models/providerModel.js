import mongoose from "mongoose";
import { config } from "../config/config.js";

const { Schema, model } = mongoose;

const ProviderCollection = config.collection.providers;

const ProviderSchema = new Schema(
  {
    cuit: { type: Number, required: true },
    razonSocial: { type: String, required: true, max: 100 },
    direccion: { type: String, required: true, max: 100 },
    telefono: { type: Number, required: true },
    email: { type: String, unique: true, required: true, max: 100 },
    observacion: { type: String, max: 200 },
  },
  {
    virtuals: true,
    timestamps: true,
  }
);

ProviderSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response._id;
    return response;
  },
});

const ProviderModel = model(ProviderCollection, ProviderSchema);

export { ProviderModel, ProviderSchema };