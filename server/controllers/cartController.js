import { ProductDao, CartDao } from "../daos/index.js";
import { ERROR } from "../utils/index.js";

const CartApi = new CartDao();
const ProductApi = new ProductDao();
const initialCart = { productos: [] };

class CartController {
  static async createCart(req, res) {
    try {
      const cart = await CartApi.save({
        ...initialCart,
      });
      const cartId = cart.id;
      res.send({ id: cartId });
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async deleteCart(req, res) {
    try {
      const { id } = req.params;
      const cart = await CartApi.deleteById(id);
      if (!cart || cart.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_CART });
      res.send({
        status: "success",
        response: "carrito eliminado correctamente",
      });
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async getProductsInCart(req, res) {
    try {
      const { id } = req.params;
      const cart = await CartApi.getById(id);
      if (!cart || cart.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_CART });
      res.send(cart);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async addProductsInCart(req, res) {
    try {
      const { id } = req.params;
      const productID = req.body.productID;
      const cart = await CartApi.getById(id);
      if (!cart || cart.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_CART });
      const product = await ProductApi.getById(productID);
      if (!product || product.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_PRODUCT });
      cart.productos.push(product);
      const updatedCart = await CartApi.updateById(id, cart);
      res.send(updatedCart);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async deleteProductInCart(req, res) {
    try {
      const { id } = req.params;
      const productID = req.params.productID;
      const cart = await CartApi.getById(id);
      if (!cart || cart.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_CART });
      const newCart = cart.productos;
      const exist = newCart.find((product) => product.id == productID);
      if (!exist)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_PRODUCT });
      const newArray = newCart.filter((product) => product.id != productID);
      cart.productos = newArray;
      const cartUpdated = await CartApi.updateById(id, cart);
      if (!cartUpdated || cartUpdated.kind)
        return res
          .status(404)
          .send({ status: "error", error: "error al borrar el producto" });
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
}

export { CartController };