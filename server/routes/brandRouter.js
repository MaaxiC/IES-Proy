import { Router } from "express";
import { BrandController } from "../controllers/index.js";
import { Admin } from "../middlewares/index.js";

const brandRouter = Router();
const { getBrands, getBrandById, createBrand, updateBrand, deleteBrand } = BrandController;

brandRouter.get("/", getBrands);
brandRouter.get("/:id", getBrandById);
brandRouter.post("/", Admin, createBrand);
brandRouter.put("/:id", Admin, updateBrand);
brandRouter.delete("/:id", Admin, deleteBrand);

export { brandRouter };