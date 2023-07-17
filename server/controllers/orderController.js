import { OrderDao, ClientDao } from "../daos/index.js";
import { ERROR } from "../utils/index.js";
import { MailingService } from '../services/mailing.js'
import { ProductController } from "./index.js";
import { OrderModel } from "../models/orderModel.js";

const OrderApi = new OrderDao()
const ClientApi = new ClientDao()
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

  static async getOrdersFromUser(req, res) {
    try {
      const { dni } = req.params;
      const orders = await OrderApi.getAll();
      const ordersFromUser = orders.filter(order => order.dni == dni);
      if (ordersFromUser.length == 0) return res.status(404).send({ status: "error", error: ERROR.MESSAGE.NO_ORDER });
      res.send(ordersFromUser);
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
      const { email, productos, montoTotal, dni, nombre, apellido } = req.body

      const clients = await ClientApi.getAll();
      const client = clients.filter(client => client.dni == dni);

      let clientSaved = ''

      if (client.length == 0) {
        try {
          clientSaved = await ClientApi.save({
            nombre,
            apellido,
            dni,
            email,
          });
        } catch (error) {
          return res.status(500)
          .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
        }
      }

      const orderSaved = await OrderApi.save(req.body);

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
      <p>Puede pasar por nuestro local en Deán Funes 41 para abonar el producto y retirarlo. Te esperamos!</p>`

      await mailer.sendMail({
          from: 'p11@gmail.com',
          to: email,
          subject: 'Recibo de pedido',
          html: `<div>
              <h1>Gracias por confiar en nosotros!</h1>
              <p>Pedido generado con el numero de orden: ${orderSaved._id}</p>
              <p>Tu contraseña de acceso para ver tus pedidos es: ${client.length != 0 ? client[0].id : clientSaved.id}</p>
              <p>Productos solicitados:</p>
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
      if (req.body.estado == '64975148588fe6631b228e20') { //Si el estado es "Anulado" se resta el stock comprometido
        await Promise.all(
          orderSaved.productos.map(async (product) => {
            ProductController.anulateStockCompromise(product)
          })
        )
      }
      if (req.body.estado == '64975094588fe6631b228e14') { //Si el estado es "Retirado por el cliente" se resta el stock comprometido
        await Promise.all(                                 //y se resta el stock disponible
        orderSaved.productos.map(async (product) => {
          ProductController.confirmStockDeliver(product)
        })
        )
      }
      res.send(orderSaved);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async getQuantitySales(req, res) {
    try {
      const pipeline = [
        {
          $unwind: "$productos"
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            totalVendido: { $sum: "$productos.cantidad" }
          }
        },
      ]
      const quantitySales = await OrderModel.aggregate(pipeline);
      res.send({ quantitySales });
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async getTotalSales(req, res) {
    try {
      const pipeline = [
        {
          $group: {
            _id: { $month: "$createdAt" },
            montoVendido: { $sum: "$montoTotal" }
          }
        },
      ]
      const amountSales = await OrderModel.aggregate(pipeline);
      res.send({ amountSales });
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }
}

export { OrderController };