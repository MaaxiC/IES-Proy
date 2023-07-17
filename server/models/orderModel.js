import mongoose from "mongoose";
import { config } from "../config/config.js";

const { Schema, model } = mongoose;

const OrderCollection = config.collection.orders;

const OrderSchema = new Schema(
  {
    nombre: { type: String, required: true, max: 100 },
    apellido: { type: String, required: true, max: 100 },
    dni: { type: Number, required: true },
    email: { type: String, required: true, max: 100 },
    productos: [
      {
        nombre: { type: String, required: true, max: 100 },
        descripcion: { type: String, required: true },
        codigo: { type: String, required: true },
        precio: { type: Number, required: true },
        categoria: {
          ref: config.collection.categories,
          type: Schema.Types.ObjectId,
        },
        marca: { ref: config.collection.brands, type: Schema.Types.ObjectId },
        cantidad: { type: Number, required: true },
      },
    ],
    montoTotal: { type: Number, required: true },
    tipoTransaccion: { type: String, required: true, max: 100 },
    estado: { ref: config.collection.states, type: Schema.Types.ObjectId },
  },
  {
    virtuals: true,
    timestamps: true,
  }
);

OrderSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response._id;
    return response;
  },
});

const OrderModel = model(OrderCollection, OrderSchema);

export { OrderModel, OrderSchema };
