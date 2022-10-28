import mongoose from "mongoose";
import { config } from "../config/config.js";

const { Schema, model } = mongoose;

const BrandCollection = config.collection.brands;

const BrandSchema = new Schema(
  {
    nombre: { type: String, required: true, max: 100 },
  },
  {
    virtuals: true,
    timestamps: true,
  }
);

BrandSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response._id;
    return response;
  },
});

const BrandModel = model(BrandCollection, BrandSchema);

export { BrandModel, BrandSchema };