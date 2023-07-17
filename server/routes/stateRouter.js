import { Router } from "express";
import { StateController } from "../controllers/index.js";
import { Admin } from "../middlewares/index.js";

const stateRouter = Router();
const { getStates, getStateById, createState, updateState, deleteState } = StateController;

stateRouter.get("/", getStates);
stateRouter.get("/:id", getStateById);
stateRouter.post("/", Admin, createState);
stateRouter.put("/:id", Admin, updateState);
stateRouter.delete("/:id", Admin, deleteState);

export { stateRouter };