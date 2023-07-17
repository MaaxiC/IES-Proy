import { Router } from "express";
import { ClientController } from "../controllers/index.js";
import { Admin } from "../middlewares/index.js";

const clientRouter = Router();
const { getClients, getClientByDni, getClientById, createClient, updateClient, deleteClient } = ClientController;

clientRouter.get("/", getClients);
clientRouter.get("/history/:id", getClientByDni);
clientRouter.get("/:id", getClientById);
clientRouter.post("/", createClient);
clientRouter.put("/:id", Admin, updateClient);
clientRouter.delete("/:id", Admin, deleteClient);

export { clientRouter };