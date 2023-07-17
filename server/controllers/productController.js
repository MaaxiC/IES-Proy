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
      product.stockComprometido = 0
      const productSaved = await ProductApi.save(product);
      res.send(productSaved);
    } catch (error) {
      if (error._original)
        return res
          .status(400)
          .send({ status: "error", error: error.details[0].message });
      res
        .status(500)
        .send({ status: "error", error: error });
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
      if (product.stock + req.body.stock < 0)
        return res
          .status(400)
          .send({ status: "error", error: ERROR.MESSAGE.NO_STOCK });
      product.stock += req.body.stock
      if (product.stock < product.stockComprometido)
          return res
            .status(400)
            .send({ status: "error", error: ERROR.MESSAGE.NO_STOCK_COMPROMISE });
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

  static async recalculateStock({id, cantidad}) {
    try {
      const product = await ProductApi.getById(id)
      product.stockComprometido += cantidad
      await ProductApi.updateById(id, product);
    } catch (error) {
      return error
    }
  }

  static async anulateStockCompromise({id, cantidad}) {
    try {
      const product = await ProductApi.getById(id)
      product.stockComprometido -= cantidad
      ProductApi.updateById(product.id, product);
    } catch (error) {
      return error
    }
  }

  static async confirmStockDeliver({id, cantidad}) {
    try {
      const product = await ProductApi.getById(id)
      product.stockComprometido -= cantidad
      product.stock -= cantidad
      ProductApi.updateById(product.id, product);
    } catch (error) {
      return error
    }
  }
}

export { ProductController };