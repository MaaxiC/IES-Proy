import passport from "passport";
import local from "passport-local";
import { RoleModel, UserModel } from "../models/index.js";
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
            direccion,
            telefono,
            dni,
            roles,
            genero,
            activo,
          } = req.body;
          const exists = await UserModel.findOne({
            $or: [{ usuario }, { email }],
          });
          if (exists) {
            return done(null, false);
          }
          const newUser = new UserModel({
            nombre,
            apellido,
            email,
            password: createHash(password),
            fechaNacimiento,
            direccion,
            telefono,
            usuario,
            dni,
            genero,
            activo,
          });
          if (roles) {
            const foundRoles = await RoleModel.find({ nombre: { $in: roles } });
            if (foundRoles.length > 0) {
              newUser.roles = foundRoles.map((role) => role.id);
            } else {
              const defaultRole = await RoleModel.findOne({ nombre: "usuario" });
              newUser.roles = [defaultRole.id];
            }
          } else {
            const role = await RoleModel.findOne({ nombre: "usuario" });
            newUser.roles = [role.id];
          }
          const result = await newUser.save();
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
          const user = await UserModel.findOne({ usuario }).populate("roles");
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
