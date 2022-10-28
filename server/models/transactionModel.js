import mongoose from "mongoose";
import { config } from "../config/config.js";

const { Schema, model } = mongoose;

const TransactionCollection = config.collection.transactions;

const TransactionSchema = new Schema(
  {
    tipoMovimiento: { type: String, required: true, max: 100 },
    usuario: { type: String, required: true },
  },
  {
    virtuals: true,
    timestamps: true,
  }
);

TransactionSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response._id;
    return response;
  },
});

const TransactionModel = model(TransactionCollection, TransactionSchema);

export { TransactionModel, TransactionSchema };