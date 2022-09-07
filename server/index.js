import express from "express";
import morgan from "morgan";
//import path from "path";
//import { __dirname } from "./utils.js";
import {
  productRouter,
  authRouter,
  cartRouter,
  userRouter,
} from "./routes/index.js";
import { initializeMongoDB } from "./database.js";
import { config } from "./config/config.js";
import { createRoles } from "./libs/initialSetup.js";
import cors from "cors";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import { initializePassport } from "./config/passport.js";

//Inicializacion
const app = express();
initializeMongoDB();
createRoles();

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongo_db.URL,
      ttl: 28800,
    }),
    secret: config.mongo_db.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Rutas
app.use(config.server.routes.products, productRouter);
app.use(config.server.routes.carts, cartRouter);
app.use(config.server.routes.auth, authRouter);
app.use(config.server.routes.auth, userRouter);
app.use((req, res) => {
  res.status(404).send({ status: "error", error: "Invalid Request" });
});

//Archivos estaticos
//app.use(express.static(path.join(__dirname, "public")));

//Servidor
app.listen(config.server.PORT, () => {
  console.log(`Servidor escuchando en ${config.server.PORT}`);
});
app.on("error", (err) => console.log(`Error en servidor ${err}`));
