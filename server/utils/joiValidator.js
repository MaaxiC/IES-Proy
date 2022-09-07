import joi from "joi";

const product = joi.object({
  nombre: joi.string().min(2).max(100).required(),
  descripcion: joi.string().min(2).max(200).required(),
  codigo: joi.string().min(3).max(20).required(),
  foto: joi.string().min(5).max(300).required(),
  precio: joi.number().required(),
  stock: joi.number().integer().required(),
});

const user = joi.object({
  nombre: joi.string().min(2).max(100).required(),
  apellido: joi.string().min(2).max(100).required(),
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
  password: joi.string().min(2).max(100).required(),
  usuario: joi.string().min(2).max(100).required(),
  fechaNacimiento: joi.date().greater('01-01-1950').less('now').required(),
  dni: joi.number().min(10000000).max(99999999).required(),
  roles: joi.array(),
  sexo: joi.string().min(1).max(100).required(),
  activo: joi.boolean().required(),
})

export const joiValidator = { product, user };