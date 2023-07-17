import { RoleModel, UserModel } from "../models/index.js";

const Admin = async (req, res, next) => {
  if (!req.session.user)
    return res
      .status(403)
      .send({ status: "error", error: "No autorizado, se requiere ser admin" });
  const user = await UserModel.findById(req.session.user.id);
  const roles = await RoleModel.find({ _id: { $in: user.roles } });
  for (let role of roles) {
    if (role.nombre === "admin") {
      return next();
    }
  }
  return res
    .status(403)
    .send({ status: "error", error: "No autorizado, se requiere ser admin" });
};

export { Admin };