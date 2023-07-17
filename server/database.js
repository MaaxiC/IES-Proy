import mongoose from "mongoose";
import { config } from "./config/config.js";

const initializeMongoDB = async () => {
  try {
    const db = await mongoose.connect(config.mongo_db.URL);
    console.log(`Conectado a la base de datos ${db.connection.name}`);
  } catch (error) {
    console.log({
      status: "error",
      error: "Fallo la conexion a la base de datos",
    });
  }
};

export { initializeMongoDB };