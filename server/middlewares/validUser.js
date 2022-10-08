import { joiValidator, ERROR } from "../utils/index.js";

const validUser = async (req, res, next) => {
  try {
    const {
      nombre,
      apellido,
      email,
      password,
      usuario,
      fechaNacimiento,
      direccion,
      telefono,
      dni,
      roles,
      genero,
      activo,
    } = req.body;
    await joiValidator.user.validateAsync({
      nombre,
      apellido,
      email,
      password,
      usuario,
      fechaNacimiento,
      direccion,
      telefono,
      dni,
      roles,
      genero,
      activo,
    });
    next();
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

export { validUser };