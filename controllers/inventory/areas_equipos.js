const Area_Equipo = require("../../models/inventory/areas_equipos");

const getAreaEquipo = async (req, res) => {
  const area_equipo = await Area_Equipo.findAll();

  res.status(200).json({ ok: true, area_equipo });
};

const getIdAreaEquipo = async (req, res) => {
  const { id } = req.params;
  const existeAreaEquipo = await Area_Equipo.findByPk(id);
  if (!existeAreaEquipo) {
    return res.status(400).json({ msg: "El area de equipo no  existe en la BD" });
  }

  res.status(200).json({ ok: true, area_equipo: existeAreaEquipo });
};

const createAreaEquipo = async (req, res) => {
  const { nombre } = req.body;

  const area_Equipo = new Tipo_Adquisicion({ nombre });
  const area_equipo = await Area_Equipo.findOne({
    where: {
      nombre: area_Equipo.nombre,
    },
  });

  if (area_equipo) {
    return res.status(400).json({
      msg: "El area de equipo ya existe",
    });
  }

  await Area_Equipo.save();
  res.status(201).json({ msg: "El area de equipo  a sido registrado con exito" });
};

const updateAreaEquipo = async (req, res) => {
  const id = req.params.id;

  const existeAreaEquipo = await Area_Equipo.findByPk(id);
  if (!existeAreaEquipo) {
    return res.status(404).json({ ok: true, msg: "No existe el area de equipo " });
  }

  const { nombre } = req.body;

  await Area_Equipo.update(
    {
      nombre,
    },
    { where: { id: id } },
  );
  res.status(200).json({ ok: true, msg: `Se actualizo con exito  el area de equipo ` });
};

const deleteAreaEquipo= async (req, res) => {
  const id = req.params.id;
  const area_Equipo = await Area_Equipo.findByPk(id);
  if (!area_Equipo) {
    return res.status(404).json({
      msg: `No existe el area de equipo  con el id ${id}`,
    });
  }
  await Area_Equipo.update({ estado: false });
  res.status(200).json({
    msg: "El area de equipo  a sido desactivado con exito...",
  });
};

module.exports = {
  createAreaEquipo,
  getIdAreaEquipo,
  getAreaEquipo,
  updateAreaEquipo,
  deleteAreaEquipo,
};
