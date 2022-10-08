import { RoleModel } from "../models/index.js";

const createRoles = async () => {
  try {
    const count = await RoleModel.estimatedDocumentCount();
    if (count > 0) return;
    await Promise.all([
      new RoleModel({ nombre: "usuario" }).save(),
      new RoleModel({ nombre: "admin" }).save(),
    ]);
    console.log("Configuracion inicial satisfactoria");
  } catch (error) {
    console.error(error);
  }
};

export { createRoles };