import mongoose from "mongoose";
import { config } from "../config/config.js";

const { Schema, model } = mongoose;

const ProductCollection = config.collection.products;

const ProductSchema = new Schema(
  {
    nombre: { type: String, required: true, max: 100 },
    descripcion: { type: String, required: true, max: 200 },
    codigo: { type: String, required: true, max: 20 },
    foto: { type: String, required: true, max: 300 },
    precio: { type: Number, required: true },
    stock: { type: Number },
    categoria: { type: String, required: true, max: 100 },
    marca: { type: String, required: true, max: 100 },
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