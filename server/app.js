import express from "express";
import morgan from "morgan";
import {
  productRouter,
  categoryRouter,
  brandRouter,
  authRouter,
  userRouter,
  providerRouter,
  transactionRouter,
  orderRouter,
  stateRouter,
  clientRouter,
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

var whitelist = ['http://localhost:3000', 'http://localhost:5173']
var corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    } 
  }
}

//Middlewares
//app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors(corsOptions));
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
    cookie: {secure: false, httpOnly: true }
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
app.use(config.server.routes.auth, authRouter);
app.use(config.server.routes.users, userRouter);
app.use(config.server.routes.providers, providerRouter);
app.use(config.server.routes.transactions, transactionRouter);
app.use(config.server.routes.orders, orderRouter);
app.use(config.server.routes.states, stateRouter);
app.use(config.server.routes.clients, clientRouter);

app.use((req, res) => {
  res.status(404).send({ status: "error", error: "Invalid Request" });
});

export default app;
