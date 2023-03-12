import express from "express";
import morgan from "morgan";
import {
  productRouter,
  categoryRouter,
  brandRouter,
  authRouter,
  cartRouter,
  userRouter,
  providerRouter,
  transactionRouter,
} from "./routes/index.js";
import { config } from "./config/config.js";
import cors from "cors";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import { initializePassport } from "./config/passport.js";
//import path from "path";
//import { __dirname } from "./utils.js";

const app = express();
initializePassport();

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
app.use(passport.initialize());
app.use(passport.session());

//Archivos estaticos
//app.use(express.static(path.join(__dirname, "public")));

//Rutas
app.use(config.server.routes.products, productRouter);
app.use(config.server.routes.categories, categoryRouter);
app.use(config.server.routes.brands, brandRouter);
app.use(config.server.routes.carts, cartRouter);
app.use(config.server.routes.auth, authRouter);
app.use(config.server.routes.users, userRouter);
app.use(config.server.routes.providers, providerRouter);
app.use(config.server.routes.transactions, transactionRouter);

app.use((req, res) => {
  res.status(404).send({ status: "error", error: "Invalid Request" });
});

export default app;
