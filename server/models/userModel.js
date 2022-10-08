import mongoose from "mongoose";
import { config } from "../config/config.js";

const { Schema, model } = mongoose;

const UserCollection = config.collection.users;

const UserSchema = new Schema(
  {
    nombre: { type: String, required: true, max: 100 },
    apellido: { type: String, required: true, max: 100 },
    email: { type: String, unique: true, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    fechaNacimiento: { type: Date, required: true },
    direccion: { type: String, required: true, max: 100 },
    telefono: { type: Number, required: true },
    usuario: { type: String, unique: true, required: true, max: 100 },
    dni: { type: Number, required: true },
    roles: [
      {
        ref: config.collection.roles,
        type: Schema.Types.ObjectId,
      },
    ],
    genero: { type: String, required: true, max: 100 },
    activo: { type: Boolean, required: true },
  },
  {
    virtuals: true,
    timestamps: true,
  }
);

UserSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response._id;
    return response;
  },
});

const UserModel = model(UserCollection, UserSchema);

export { UserModel, UserSchema };