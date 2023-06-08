import { OrderDao } from "../daos/index.js";
import { ERROR } from "../utils/index.js";
import { MailingService } from '../services/mailing.js'
import { ProductController } from "./index.js";

const OrderApi = new OrderDao()
const mailer = new MailingService

class OrderController {
  static async getOrders(req, res) {
    try {
      const orders = await OrderApi.getAll();
      res.send(orders);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async getOrderById(req, res) {
    try {
      const orderID = req.params.id;
      const order = await OrderApi.getById(orderID);
      if (!order || order.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_ORDER });
      res.send(order);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async createOrder(req, res) {
    try {
      const orderSaved = await OrderApi.save(req.body);
      const { email, productos, montoTotal } = req.body

      let message = '';

      await Promise.all(
        productos.map(async (product) => {
          await ProductController.recalculateStock(product)
          return message += `<div>
            <ul>
              <li>
                <h3>${product.nombre} - Cantidad: ${product.cantidad} - Precio: $${product.precio}</h3>
              </li>
            </ul>
          </div>`
        })
      )

      message += `<h3>TOTAL: $${montoTotal}</h3>
      <p>Puede pasar a retirarlo por nuestro local en Deán Funes 41. Te esperamos!</p>`

      await mailer.sendMail({
          from: 'p11@gmail.com',
          to: email,
          subject: 'Recibo de compra',
          html: `<div>
              <h1>Gracias por tu compra!</h1>
              <p>Pedido generado con el numero de orden: ${orderSaved._id}</p>
              <p>Productos comprados:</p>
              ${message}
          </div>`
      });

      res.send(orderSaved);
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async updateOrder(req, res) {
    try {
      const { id } = req.params;
      const orderSaved = await OrderApi.updateById(id, req.body);
      if (!orderSaved || orderSaved.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_ORDER });
      res.send(orderSaved);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }
}

export { OrderController };