const Estado_Equipo = require("../../models/inventory/estado_equipo");



const getEstadoEquipo = async (req, res) => {
  const estadoEquipo = await Estado_Equipo.findAll();

  res.status(200).json({ ok: true, estadoEquipo });
};

const getIdEstadoEquipo = async (req, res) => {
  const { id } = req.params;
  const existeEstadoEquipo = await Estado_Equipo.findByPk(id);
  if (!existeEstadoEquipo) {
    return res.status(400).json({ msg: "El estado  no  existe en la BD" });
  }

  res.status(200).json({ ok: true, estadoEquipo: existeEstadoEquipo });
};

const createEstadoEquipo = async (req, res) => {
  const { nombre, descripcion} = req.body;

  const estadoEquipo = new Estado_Equipo({ nombre,  descripcion });
  const estadoequipo = await Estado_Equipo.findOne({
    where: {
      nombre: estadoEquipo.nombre,
    },
  });

  if (estadoequipo) {
    return res.status(400).json({
      msg: "El estado ya existe",
    });
  }

  await estadoEquipo.save();
  res.status(201).json({ msg: "El estado a sido registrado con exito" });
};

const updateEstadoEquipo = async (req, res) => {
  const id = req.params.id;

  const existeEstadoEquipo = await Estado_Equipo.findByPk(id);
  if (!existeEstadoEquipo) {
    return res.status(404).json({ ok: true, msg: "No existe el estado" });
  }

  const { nombre,descripcion } = req.body;

  await Estado_Equipo.update(
    {
      nombre,
     
      descripcion,
    
    },
    { where: { id: id } },
  );
  res.status(200).json({
    ok: true,
    msg: `Se actualizo con exito  el estado`,
    //Permiso: PermisoUpdate,
  });
};

const deleteEstadoEquipo = async (req, res) => {
  const id = req.params.id;
  const estadoEquipo = await Estado_Equipo.findByPk(id);

  await estadoEquipo.update({ estado: false });
  res.status(200).json({
    msg: "El estado a sido desactivado con exito...",
  });
};

module.exports = {
  createEstadoEquipo,
  getEstadoEquipo,
  getIdEstadoEquipo,
  updateEstadoEquipo,
  deleteEstadoEquipo,
};
