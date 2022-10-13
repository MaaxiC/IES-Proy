import joi from "joi";

const product = joi.object({
  nombre: joi.string().min(2).max(100).required(),
  descripcion: joi.string().min(2).max(200).required(),
  codigo: joi.string().min(3).max(20).required(),
  foto: joi.string().min(5).max(300).required(),
  precio: joi.number().required(),
  stock: joi.number().integer(),
  categoria: joi.string().min(2).max(100).required(),
  marca: joi.string().min(2).max(100).required(),
});

const user = joi.object({
  nombre: joi.string().min(2).max(100).required(),
  apellido: joi.string().min(2).max(100).required(),
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required(),
  password: joi.string().min(2).max(100).required(),
  usuario: joi.string().min(2).max(100).required(),
  fechaNacimiento: joi.date().greater('01-01-1950').less('now').required(),
  direccion: joi.string().min(5).max(100).required(),
  telefono: joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Telefono debe tener 10 digitos`}).required(),
  dni: joi.number().integer().min(10000000).max(99999999).required(),
  roles: joi.array(),
  genero: joi.string().min(1).max(100).required(),
  activo: joi.boolean().required(),
})

const updateUser = joi.object({
  nombre: joi.string().min(2).max(100),
  apellido: joi.string().min(2).max(100),
  direccion: joi.string().min(5).max(100),
  telefono: joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Telefono debe tener 10 digitos`}),
  genero: joi.string().min(1).max(100),
})

export const joiValidator = { product, user, updateUser };