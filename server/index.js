import express from "express";
import morgan from "morgan";
import path from "path";
import { __dirname } from "./utils.js";
import { productRouter, authRouter, cartRouter } from "./routes/index.js";
import { initializeMongoDB } from "./database.js";
import { config } from "./config/config.js";
import cors from "cors";

//Inicializacion
const app = express();
initializeMongoDB();

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Rutas
app.use(config.server.routes.products, productRouter);
app.use(config.server.routes.auth, authRouter);
app.use(config.server.routes.carts, cartRouter);

//Archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

//Servidor
app.listen(config.server.PORT, () => {
  console.log(`Servidor escuchando en ${config.server.PORT}`);
});
app.on("error", (err) => console.log(`Error en servidor ${err}`));