const validateEmpty = (req, res, next) => {
  const { usuario, password } = req.body;
  if (usuario.trim() == "")
    return res
      .status(400)
      .send({ status: "error", error: "complete el campo usuario" });
  if (password.trim() == "")
    return res
      .status(400)
      .send({ status: "error", error: "complete el campo contraseña" });
  next();
};

export { validateEmpty };