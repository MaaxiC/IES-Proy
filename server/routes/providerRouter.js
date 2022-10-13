import { Router } from "express";
import { Admin } from "../middlewares/index.js";
import {
  getProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider,
} from "../controllers/index.js";

const providerRouter = Router();

providerRouter.get("/", getProviders);
providerRouter.get("/:id", getProviderById);
providerRouter.post("/", Admin, createProvider);
providerRouter.put("/:id", Admin, updateProvider);
providerRouter.delete("/:id", Admin, deleteProvider);

export { providerRouter };
