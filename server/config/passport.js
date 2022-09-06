import passport from "passport";
import local from "passport-local";
import { UserModel } from "../models/index.js";
import bcrypt from "bcrypt";

const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const validatePassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

const LocalStrategy = local.Strategy;
const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "usuario" },
      async (req, usuario, password, done) => {
        try {
          const {
            nombre,
            apellido,
            email,
            fechaNacimiento,
            dni,
            roles,
            sexo,
            activo,
          } = req.body;
          const exists = await UserModel.findOne({
            $or: [{ usuario }, { email }],
          });
          if (exists) {
            return done(null, false);
          }
          const result = await UserModel.create({
            nombre,
            apellido,
            email,
            password: createHash(password),
            fechaNacimiento,
            usuario,
            dni,
            roles,
            sexo,
            activo,
          });
          return done(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "usuario" },
      async (usuario, password, done) => {
        try {
          const user = await UserModel.findOne({ usuario });
          if (!user) {
            return done(null, false, {
              message: "no existe el usuario en la base de datos",
            });
          }
          if (!validatePassword(user, password)) {
            return done(null, false, { message: "contraseña incorrecta" });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const result = await UserModel.findOne({ id });
    return done(null, result);
  });
};

export { initializePassport };