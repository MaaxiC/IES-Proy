import { ProductDao, TransactionDao } from "../daos/index.js";
import { ERROR, joiValidator } from "../utils/index.js";

const ProductApi = new ProductDao();
const TransactionApi = new TransactionDao();

class ProductController {
  static async getProducts(req, res) {
    try {
      const products = await ProductApi.getAll();
      res.send(products);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async getProductById(req, res) {
    try {
      const productID = req.params.id;
      const product = await ProductApi.getById(productID);
      if (!product || product.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_PRODUCT });
      res.send(product);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async createProduct(req, res) {
    try {
      const { nombre, descripcion, codigo, foto, precio, stock, categoria, marca } = req.body;
      const product = await joiValidator.product.validateAsync({
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
        categoria,
        marca
      });
      const productSaved = await ProductApi.save(product);
      res.send(productSaved);
    } catch (error) {
      if (error._original)
        return res
          .status(400)
          .send({ status: "error", error: error.details[0].message });
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion, codigo, foto, precio, categoria, marca } = req.body;
      const product = await joiValidator.product.validateAsync({
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        categoria,
        marca
      });
      const productSaved = await ProductApi.updateById(id, product);
      if (!productSaved || productSaved.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_PRODUCT });
      res.send(productSaved);
    } catch (error) {
      if (error._original)
        return res
          .status(400)
          .send({ status: "error", error: error.details[0].message });
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const productID = req.params.id;
      const response = await ProductApi.deleteById(productID);
      if (!response || response.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_PRODUCT });
      res.send({
        status: "success",
        response: "producto eliminado correctamente",
      });
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async updateStock(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductApi.getById(id)
      product.stock += req.body.stock
      const productSaved = await ProductApi.updateById(id, product);
      if (!productSaved || productSaved.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_PRODUCT });
      await TransactionApi.save({
        tipoMovimiento: "Actualización de stock",
        usuario: req.session.user.usuario,
      })
      res.send(productSaved);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }
}

export { ProductController };