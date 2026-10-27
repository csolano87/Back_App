//const Cabecera = require("../models/cabecera");
const Rol = require("../middleware/validar-roles");

const rolValido = async (rolId = "") => {
  console.log("validar rol",rolId);
  /* cambio de rol x id */
  const existeRol = await Rol.findOne({ where: { id: rolId } });
  //console.log(existeRol);
  if (!existeRol) {
    throw new Error(`El rol ${rolId} no esta registrado en la BD`);
  }
};

module.exports = { rolValido };
