const Rol = require("../../models/security/role");


const getRoles = async (req, res) => {
  const roles = await Rol.findAll();

  res.status(200).json({ ok: true, roles });
};

const getIdRoles = async (req, res) => {
  const { id } = req.params;
  const existeRol = await Rol.findByPk(id);
  if (!existeRol) {
    return res.status(400).json({ msg: "El rol no  existe en la BD" });
  }

  res.status(200).json({ ok: true, roles: existeRol });
};

const createRoles = async (req, res) => {
  const { nombre } = req.body;

  const roles = new Rol({ nombre });
  const role = await Rol.findOne({
    where: {
      nombre: roles.nombre,
    },
  });

  if (role) {
    return res.status(400).json({
      msg: "Este rol ya existe",
    });
  }

  await roles.save();
  res.status(201).json({ msg: "El rol a sido registrado con exito" });
};

const updateRoles = async (req, res) => {
  const id = req.params.id;

  const existeRol = await Rol.findByPk(id);
  if (!existeRol) {
    return res.status(404).json({ ok: true, msg: "No existe rol" });
  }

  const { nombre } = req.body;

  const rolUpdate = await Rol.update(
    {
      nombre,
    },
    { where: { id: id } },
  );
  res
    .status(200)
    .json({ ok: true, msg: `Se actualizo con exito  el rol`, rol: existeRol });
};

const deleteRoles = async (req, res) => {
  const id = req.params.id;
  const rol = await Rol.findByPk(id);

  await rol.update({ estado: false });
  res.status(200).json({
    msg: "El rol a sido desactivado con exito...",
  });
};

module.exports = {
  createRoles,
  getRoles,
  deleteRoles,
  updateRoles,
  getIdRoles,
};
