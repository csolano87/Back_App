const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuarios");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
//console.log(token)
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    //const { id } = //continua
    const { id } = jwt.verify(token, process.env.SECRETOPRIVATEKEY);
    //console.log('akiestou',id)
    // leer el usuario que corresponde al uid
    const user = await Usuario.findOne({ where: id });
    //  console.log('Estoy consuktando la BD',user)
    if (!user) {
      return res
        .status(401)
        .json({
          msg: "Token no válido - usuario no existe en la base de datos",
        });
    }
    if (!user.estado) {
      return res
        .status(401)
        .json({ msg: "Token no válido - usuario no existe DB-estado false" });
    }
    req.usuario = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido- ingrese un token valido",
    });
  }
};

module.exports = {
  validarJWT,
};
