

const bcryptjs = require("bcryptjs");

const Usuario = require("../../models/security/usuarios");
const { Op, Model } = require("sequelize");

const Rol = require("../../models/security/role");
const Menu = require("../../models/security/menus");
const Permiso = require("../../models/security/permisos");

const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.findAll({
    attributes: {
      exclude: ["password"],
    },
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
  res.status(200).json({ ok: true, usuarios: usuarios });
};

const getIdUsuarios = async (req, res) => {
  const { id } = req.params;
  const existeUser = await Usuario.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
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

  res.status(200).json({ ok: true, user: existeUser });
};

const getFiltroUsuarios = async (req, res) => {
  const { busquedausuario } = req.params;

  const dataCA = busquedausuario.replace(/\w\S*/g, function (e) {
    return e.charAt(0).toUpperCase() + e.substring(1);
  });

  const data = await Usuario.findAll({
    where: {
      doctor: {
        [Op.like]: `%${dataCA}%`,
      },
    },
    include: {
      model: Rol,
      as: "rol",
    },
  });

  res.status(200).json({ ok: true, resultados: data });
};

const createUsuarios = async (req, res) => {
  try {
    const { apellidos, nombres, usuario, password, rolId } = req.body;

    const user = new Usuario({
    apellidos, nombres, usuario, password, rolId
    });

    const existeUser = await Usuario.findOne({
      where: { usuario: user.usuario },
    });

    if (existeUser) {
      return res.status(400).json({ msg: "Este usuario ya existe" });
    }

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    res.status(201).json({
      msg: "El usuario a sido registrado con exito",
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUsuarios = async (req, res) => {
  const id = req.params.id;
//console.log('------------update',id)
  const existeUser = await Usuario.findByPk(id);
  if (!existeUser) {
    return res.status(404).json({ ok: true, msg: "no existe usuario" });
  }

  const { apellidos, nombres, usuario, password, rolId  } = req.body;

  const usuarioUpdate = await Usuario.update(
    {
      apellidos, nombres, usuario, password, rolId 
    },
    { where: { id: id } },
  );

  res
    .status(200)
    .json({ ok: true, msg: `Se actualizo con exito los datos del usuario` });
};

const deleteUsuarios = async (req, res) => {
  const { id } = req.params;

  const user = await Usuario.findByPk(id);

  if (!user) {
    return res.status(404).json({
      msg: `No existe un usuario con el id ${id}`,
    });
  }
  // await usuario.destroy();
  await user.update({ estado: false });
  res.status(200).json({
    msg: "El usuario a sido desactivado con exito...",
  });
};

module.exports = {
  getUsuarios,
  getIdUsuarios,
  getFiltroUsuarios,
  createUsuarios,
  updateUsuarios,
  deleteUsuarios
};
