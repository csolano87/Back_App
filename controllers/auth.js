const { Request, Response } = require("express");
const Usuario = require("../models/usuarios");

const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generarJWT");
const Rol = require("../models/role");
const Permiso = require("../models/permisos");
const Menu = require("../models/menus");
//const Menu = require("../models/menu");

const login = async (req, res) => {
  const { usuario, password } = req.body;
  const user = new Usuario({ usuario, password });

  //verificar si el correo existe
  const existeuser = await Usuario.findOne({
    where: {
      usuario: user.usuario,
    },
    /* attributes: {
      exclude: ["password"],
    }, */
    include: {
      model: Rol,
      as: "rol",

      include: [
        {
          model: Permiso,
          as: "permiso",
          through: {
            attributes: [],
          },
          include: {
            model: Menu,
            as: "menu",
          },
        },
      ],
    },
  });

  //const usuario=await Usuario.findOne({correo});
  if (!existeuser) {
    return res.status(400).json({
      msg: "Las credenciales ingresadas son las correctas",
    });
  }

  // Verificar estado
  if (!existeuser.estado) {
    return res.status(403).json({
      msg: "Usuario inactivo",
    });
  }
  //console.log(password)
  const validarPassword = bcryptjs.compareSync(password, existeuser.password);
  if (!validarPassword) {
    return res.status(400).json({
      msg: "usuario no son correctos-pass",
    });
  }

  const token = await generarJWT(existeuser.id);
// Convertir instancia Sequelize a objeto
  const usuarioResponse = existeuser.toJSON();

  // Eliminar contraseña de la respuesta
  delete usuarioResponse.password;
  res.status(200).json({
    usuario: usuarioResponse,
    token,
  });
  /* } catch (error) {
        console.log(error);
        return res.status(500).json({

            msg:'Comuniquese con el Administrador'
        })
    } */
};
const renewToken = async (req, res = response) => {
  const id = req.usuario.id;
  //   console.log(id)
  // Generar el TOKEN - JWT
  const token = await generarJWT(id);
  const user = await Usuario.findOne({
    where: {
      id,
    },
    include: {
      model: Rol,
      as: "rol",
      include: {
        model: Menu,
        as: "menu",
      },
    },
  });
  res.json({
    ok: true,
    token,
    user,
  });
};
module.exports = { login, renewToken };
