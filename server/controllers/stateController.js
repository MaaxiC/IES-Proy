import { StateDao } from "../daos/index.js";
import { ERROR } from "../utils/index.js";

const StateApi = new StateDao()

class StateController {
  static async getStates(req, res) {
    try {
      const states = await StateApi.getAll();
      res.send(states);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async getStateById(req, res) {
    try {
      const id = req.params.id;
      const state = await StateApi.getById(id);
      if (!state || state.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_STATE });
      res.send(state);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async createState(req, res) {
    try {
      const stateSaved = await StateApi.save(req.body);
      res.send(stateSaved);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async updateState(req, res) {
    try {
      const { id } = req.params;
      const stateSaved = await StateApi.updateById(id, req.body);
      if (!stateSaved || stateSaved.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_STATE });
      res.send(stateSaved);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async deleteState(req, res) {
    try {
      const id = req.params.id;
      const response = await StateApi.deleteById(id);
      if (!response || response.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_STATE });
      res.send({
        status: "success",
        response: "estado eliminado correctamente",
      });
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }
}

export { StateController };