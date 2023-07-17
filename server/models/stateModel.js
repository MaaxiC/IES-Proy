import mongoose from "mongoose";
import { config } from "../config/config.js";

const { Schema, model } = mongoose;

const StateCollection = config.collection.states;

const StateSchema = new Schema(
  {
    nombre: { type: String, required: true, max: 100 }
  },
  {
    virtuals: true,
    timestamps: true,
  }
);

StateSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response._id;
    return response;
  },
});

const StateModel = model(StateCollection, StateSchema);

export { StateModel, StateSchema };