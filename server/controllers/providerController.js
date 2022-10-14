import { ProviderDao } from "../daos/index.js";
import { ERROR, joiValidator } from "../utils/index.js";

const ProviderApi = new ProviderDao();

const getProviders = async (req, res) => {
  try {
    const providers = await ProviderApi.getAll();
    res.send(providers);
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
  }
};

const getProviderById = async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await ProviderApi.getById(id);
    if (!provider || provider.kind)
      return res
        .status(404)
        .send({ status: "error", error: ERROR.MESSAGE.NO_PROVIDER });
    res.send(provider);
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
  }
};

const createProvider = async (req, res) => {
  try {
    const {
      cuit,
      razonSocial,
      direccion,
      telefono,
      email,
      observacion,
    } = req.body;
    const provider = await joiValidator.provider.validateAsync({
      cuit,
      razonSocial,
      direccion,
      telefono,
      email,
      observacion,
    });
    const providerSaved = await ProviderApi.save(provider);
    res.send(providerSaved);
  } catch (error) {
    if (error._original)
      return res
        .status(400)
        .send({ status: "error", error: error.details[0].message });
    res
      .status(500)
      .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
  }
};

const updateProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const { direccion, telefono, email, observacion } = req.body;
    const provider = await joiValidator.updateProvider.validateAsync({
      direccion,
      telefono,
      email,
      observacion,
    });
    const providerSaved = await ProviderApi.updateById(id, provider);
    if (!providerSaved || providerSaved.kind)
      return res
        .status(404)
        .send({ status: "error", error: ERROR.MESSAGE.NO_PROVIDER });
    res.send(providerSaved);
  } catch (error) {
    if (error._original)
      return res
        .status(400)
        .send({ status: "error", error: error.details[0].message });
    res
      .status(500)
      .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
  }
};

const deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await ProviderApi.deleteById(id);
    if (!response || response.kind)
      return res
        .status(404)
        .send({ status: "error", error: ERROR.MESSAGE.NO_PROVIDER });
    res.send({
      status: "success",
      response: "proveedor eliminado correctamente",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
  }
};

export {
  getProviders,
  getProviderById,
  createProvider,
  deleteProvider,
  updateProvider,
};
