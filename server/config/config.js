import dotenv from "dotenv";
dotenv.config();

const PORT = 4000;

const config = {
  collection: {
    products: "productos",
    carts: "carritos",
    users: "usuarios",
    roles: "roles",
    providers: "proveedores",
    categories: "categorias",
    brands: "marcas",
    transactions: "transacciones",
  },
  mongo_db: {
    URL: process.env.URL ?? "mongodb://localhost/p11",
    SECRET: process.env.SECRET ?? "secretKeySessionDefault"
  },
  server: {
    PORT: process.env.PORT ?? PORT,
    routes: {
      auth: "/auth/api",
      products: "/api/productos",
      categories: "/api/categorias",
      brands: "/api/marcas",
      carts: "/api/carrito",
      users: "/api/usuarios",
      providers: "/api/proveedores",
      transactions: "/api/transacciones",
    },
  },
};

export { config };