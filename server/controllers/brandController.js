import { BrandDao } from "../daos/index.js";
import { ERROR } from "../utils/index.js";

const BrandApi = new BrandDao()

class BrandController {
  static async getBrands(req, res) {
    try {
      const brands = await BrandApi.getAll();
      res.send(brands);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async getBrandById(req, res) {
    try {
      const brandID = req.params.id;
      const brand = await BrandApi.getById(brandID);
      if (!brand || brand.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_BRAND });
      res.send(brand);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async createBrand(req, res) {
    try {
      const brandSaved = await BrandApi.save(req.body);
      res.send(brandSaved);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async updateBrand(req, res) {
    try {
      const { id } = req.params;
      const brandSaved = await BrandApi.updateById(id, req.body);
      if (!brandSaved || brandSaved.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_BRAND });
      res.send(brandSaved);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async deleteBrand(req, res) {
    try {
      const brandID = req.params.id;
      const response = await BrandApi.deleteById(brandID);
      if (!response || response.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_BRAND });
      res.send({
        status: "success",
        response: "marca eliminada correctamente",
      });
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }
}

export { BrandController };