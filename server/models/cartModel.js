import mongoose from "mongoose";
import { ProductSchema } from "./productModel.js";
import { config } from "../config/config.js";

const { Schema, model } = mongoose;

const CartCollection = config.collection.carts;

const CartSchema = new Schema(
  {
    productos: [ProductSchema],
  },
  {
    virtuals: true,
    timestamps: true,
  }
);

CartSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response._id;
    return response;
  },
});

const CartModel = model(CartCollection, CartSchema);

export { CartModel, CartSchema };