import passport from "passport";

const signUp = async (req, res) => {
  res.send({ status: "success", payload: req.user.id });
};

const registerFail = async (req, res) => {
  res
    .status(401)
    .send({
      status: "error",
      error: "el usuario o el mail ya se encuentra registrado",
    });
};

const validateSignIn = async (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).send({ status: "error", error: info.message });
    }
    req.session.user = {
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      usuario: user.usuario,
      fechaNacimiento: user.fechaNacimiento,
      dni: user.dni,
      roles: user.roles,
      sexo: user.sexo,
      activo: user.activo,
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    next();
  })(req, res, next);
};

const signIn = async (req, res) => {
  res.send({ status: "success", payload: req.session.user.id });
};

const loginFail = async (req, res) => {
  res.status(500).send({ status: "error", error: "fallo al iniciar sesion" });
};

export { signUp, signIn, registerFail, loginFail, validateSignIn };