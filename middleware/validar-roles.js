const { repsonse, response } = require("express");


const Rol = require("../models/security/role");
const esAdminRole = (req, res = repsonse, next) => {
  if (!req.usuario) {
    // console.log(req.usuario)
    return res
      .status(500)
      .json({
        msg: "Se quiere verificar el role sin validar el token primero",
      });
  }

  const { rolId, doctor } = req.usuario;
  //console.log(roleId)


  if (rolId != "1" ) {
    return res
      .status(401)
      .json({ msg: `${doctor} no es administrador-no puede hacer esto` });
  }
  next();
};

const tieneRole = async (req, res = repsonse, next) => {
  const { rolId } = req.usuario;

  if (!req.usuario) {
    //console.log(req.usuario)
    return res
      .status(500)
      .json({
        msg: "Se quiere verificar el role sin validar el token primero",
      });
  }
  
 const roles = await Rol.findByPk(rolId);
 // console.log(roles)
  if (!roles) {
    return res
      .status(401)
      .json({ msg: `El servicio requiere uno de estos roles ${roles}` });
  }
  next();
};

module.exports = { esAdminRole, tieneRole };
