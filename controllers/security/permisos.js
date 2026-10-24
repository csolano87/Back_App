const Permiso = require("../../models/security/permisos");


const getPermisos = async (req, res) => {
  const permisos = await Permiso.findAll();

  res.status(200).json({ ok: true, permisos });
};

const getIdPermisos = async (req, res) => {
  const { id } = req.params;
  const existePermiso = await Permiso.findByPk(id);
  if (!existePermiso) {
    return res.status(400).json({ msg: "El Permiso no  existe en la BD" });
  }

  res.status(200).json({ ok: true, permisos: existePermiso });
};

const createPermisos = async (req, res) => {
  const { nombre, codigo, descripcion, menuId } = req.body;

  const permisos = new Permiso({ nombre, codigo, descripcion, menuId });
  const permiso = await Permiso.findOne({
    where: {
      nombre: permisos.nombre,
    },
  });

  if (permiso) {
    return res.status(400).json({
      msg: "El permiso ya existe",
    });
  }

  await permisos.save();
  res.status(201).json({ msg: "El permiso a sido registrado con exito" });
};

const updatePermisos = async (req, res) => {
  const id = req.params.id;

  const existePermiso = await Permiso.findByPk(id);
  if (!existePermiso) {
    return res.status(404).json({ ok: true, msg: "No existe el Permiso" });
  }

  const { nombre, codigo, descripcion, menuId } = req.body;

  const PermisoUpdate = await Permiso.update(
    {
      nombre,
      codigo,
      descripcion,
      menuId,
    },
    { where: { id: id } },
  );
  res.status(200).json({
    ok: true,
    msg: `Se actualizo con exito  el permiso`,
    //Permiso: PermisoUpdate,
  });
};

const deletePermisos = async (req, res) => {
  const id = req.params.id;
  const permiso = await Permiso.findByPk(id);

  await permiso.update({ estado: false });
  res.status(200).json({
    msg: "El permiso a sido desactivado con exito...",
  });
};

module.exports = {
  createPermisos,
  getPermisos,
  getIdPermisos,
  updatePermisos,
  deletePermisos,
};
