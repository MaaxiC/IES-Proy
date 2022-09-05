import dotenv from "dotenv";
dotenv.config();

const PORT = 4000;

const config = {
  collection: {
    products: "productos",
    carts: "carritos",
  },
  mongo_db: {
    URL: process.env.URL ?? "mongodb://localhost/p11",
  },
  server: {
    PORT: process.env.PORT ?? PORT,
    routes: {
      admin: "/admin",
      products: "/api/productos",
      carts: "/api/carrito",
    },
  },
};

export { config };