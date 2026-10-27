const PlantillaNotificacion = require("../../models/notifications/plantillaNotificaciones");




const getPlantillaNotificacion = async (req, res) => {
  const plantillaNotificacion = await PlantillaNotificacion.findAll();

  res.status(200).json({ ok: true, plantillaNotificacion });
};

const getIdPlantillaNotificacion = async (req, res) => {
  const { id } = req.params;
  const existePlantillaNotificacion = await PlantillaNotificacion.findByPk(id);
  if (!existePlantillaNotificacion) {
    return res.status(400).json({ msg: "La plantilla notificacion no  existe en la BD" });
  }

  res.status(200).json({ ok: true, plantillaNotificacion: existePlantillaNotificacion });
};

const createPlantillaNotificacion = async (req, res) => {
  const {  codigo, canal, nombre, contenido} = req.body;

  const plantillaNotificacions = new PlantillaNotificacion({ codigo, canal, nombre, contenido});
 /*  const PlantillaNotificacion = await PlantillaNotificacion.findOne({
    where: {
      nombre: PlantillaNotificacions.ruc,
    },
  });

  if (PlantillaNotificacion) {
    return res.status(400).json({
      msg: "La PlantillaNotificacion  ya existe",
    });
  } */

  await plantillaNotificacions.save();
  res.status(201).json({ msg: "La plantilla notificacion a sido registrado con exito" });
};

const updatePlantillaNotificacion = async (req, res) => {
  const id = req.params.id;

  const existePlantillaNotificacion = await PlantillaNotificacion.findByPk(id);
  if (!existePlantillaNotificacion) {
    return res.status(404).json({ ok: true, msg: "No existe la PlantillaNotificacion" });
  }

  const { codigo, canal, nombre, contenido } = req.body;

   await PlantillaNotificacion.update(
    {
      codigo, canal, nombre, contenido
    },
    { where: { id: id } },
  );
  res.status(200).json({
    ok: true,
    msg: `Se actualizo con exito  la plantilla notificacion`,
    //Permiso: PermisoUpdate,
  });
};

const deletePlantillaNotificacion = async (req, res) => {
  const id = req.params.id;
  const plantillaNotificacion = await PlantillaNotificacion.findByPk(id);

  await plantillaNotificacion.update({ estado: false });
  res.status(200).json({
    msg: "La plantilla notificacion  a sido desactivado con exito...",
  });
};

module.exports = {
  createPlantillaNotificacion,
  getPlantillaNotificacion,
  getIdPlantillaNotificacion,
  updatePlantillaNotificacion,
  deletePlantillaNotificacion,
};
