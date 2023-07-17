import { CategoryDao } from "../daos/index.js";
import { ERROR } from "../utils/index.js";

const CategoryApi = new CategoryDao()

class CategoryController {
  static async getCategories(req, res) {
    try {
      const categories = await CategoryApi.getAll();
      res.send(categories);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async getCategoryById(req, res) {
    try {
      const categoryID = req.params.id;
      const category = await CategoryApi.getById(categoryID);
      if (!category || category.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_CATEGORY });
      res.send(category);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async createCategory(req, res) {
    try {
      const categorySaved = await CategoryApi.save(req.body);
      res.send(categorySaved);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const categorySaved = await CategoryApi.updateById(id, req.body);
      if (!categorySaved || categorySaved.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_CATEGORY });
      res.send(categorySaved);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async deleteCategory(req, res) {
    try {
      const categoryID = req.params.id;
      const response = await CategoryApi.deleteById(categoryID);
      if (!response || response.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_CATEGORY });
      res.send({
        status: "success",
        response: "categoria eliminada correctamente",
      });
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }
}

export { CategoryController };