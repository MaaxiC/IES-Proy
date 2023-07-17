import dotenv from "dotenv";
dotenv.config();

const PORT = 4000;

const config = {
  collection: {
    products: "productos",
    users: "usuarios",
    roles: "roles",
    providers: "proveedores",
    categories: "categorias",
    brands: "marcas",
    transactions: "transacciones",
    orders: "ordenes",
    states: "estados",
    clients: "clientes",
  },
  mongo_db: {
    URL: process.env.URL ?? "mongodb://localhost/p11",
    SECRET: process.env.SECRET ?? "secretKeySessionDefault"
  },
  mailing: {
    EMAIL: process.env.EMAIL ?? "test@test.com",
    EMAIL_PASS: process.env.EMAIL_PASS ?? "test",
  },
  server: {
    PORT: process.env.PORT ?? PORT,
    routes: {
      auth: "/auth/api",
      products: "/api/productos",
      categories: "/api/categorias",
      brands: "/api/marcas",
      users: "/api/usuarios",
      providers: "/api/proveedores",
      transactions: "/api/transacciones",
      orders: "/api/ordenes",
      states: "/api/estados",
      clients: "/api/clientes",
    },
  },
};

export { config };