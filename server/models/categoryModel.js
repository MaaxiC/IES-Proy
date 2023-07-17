import mongoose from "mongoose";
import { config } from "../config/config.js";

const { Schema, model } = mongoose;

const CategoryCollection = config.collection.categories;

const CategorySchema = new Schema(
  {
    nombre: { type: String, required: true, max: 100 }
  },
  {
    virtuals: true,
    timestamps: true,
  }
);

CategorySchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response._id;
    return response;
  },
});

const CategoryModel = model(CategoryCollection, CategorySchema);

export { CategoryModel, CategorySchema };