import { Router } from "express";
import { CategoryController } from "../controllers/index.js";
import { Admin } from "../middlewares/index.js";

const categoryRouter = Router();
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = CategoryController;

categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/", Admin, createCategory);
categoryRouter.put("/:id", Admin, updateCategory);
categoryRouter.delete("/:id", Admin, deleteCategory);

export { categoryRouter };