import mongoose from "mongoose";
import { config } from "../config/config.js";

const { Schema, model } = mongoose;

const ProductCollection = config.collection.products;

const ProductSchema = new Schema(
  {
    nombre: { type: String, required: true, max: 100 },
    descripcion: { type: String, required: true },
    codigo: { type: String, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number },
    stockComprometido: { type: Number },
    categoria: { ref: config.collection.categories, type: Schema.Types.ObjectId },
    marca: { ref: config.collection.brands, type: Schema.Types.ObjectId },
  },
  {
    virtuals: true,
    timestamps: true,
  }
);

ProductSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response._id;
    return response;
  },
});

const ProductModel = model(ProductCollection, ProductSchema);

export { ProductModel, ProductSchema };