const ADMIN = true;

const Admin = (req, res, next) => {
  if (!ADMIN)
    return res
      .status(401)
      .send({ status: "error", error: "Usuario no autorizado" });
  next();
};

export { Admin };