import { ClientDao } from "../daos/index.js";
import { ERROR } from "../utils/index.js";
import { ClientModel } from "../models/clientModel.js";

const ClientApi = new ClientDao()

class ClientController {
  static async getClients(req, res) {
    try {
      const clients = await ClientApi.getAll();
      res.send(clients);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async getClientById(req, res) {
    try {
      const clientID = req.params.id;
      const client = await ClientApi.getById(clientID);
      if (!client || client.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_CLIENT });  
      res.send(client);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async getClientByDni(req, res) {
    try {
      const clientDNI = req.params.id;
      const passwordClient = req.query.password
      const client = await ClientModel.findOne({ dni: clientDNI });
      if (!client || client.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_CLIENT });
      if (client.id != passwordClient) return res.status(401).send({ status: "error", error: ERROR.MESSAGE.UNAUTHORIZED });   
      res.send(client);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async createClient(req, res) {
    try {
      const clientSaved = await ClientApi.save(req.body);
      res.send(clientSaved);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async updateClient(req, res) {
    try {
      const { id } = req.params;
      const clientSaved = await ClientApi.updateById(id, req.body);
      if (!clientSaved || clientSaved.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_CLIENT });
      res.send(clientSaved);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async deleteClient(req, res) {
    try {
      const clientID = req.params.id;
      const response = await ClientApi.deleteById(clientID);
      if (!response || response.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_CLIENT });
      res.send({
        status: "success",
        response: "cliente eliminado correctamente",
      });
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }
}

export { ClientController };