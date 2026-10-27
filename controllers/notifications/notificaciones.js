const Notificacion = require("../../models/notifications/notificaciones");




const getNotificacion = async (req, res) => {
  const notificacion = await Notificacion.findAll();

  res.status(200).json({ ok: true, notificacion });
};

const getIdNotificacion = async (req, res) => {
  const { id } = req.params;
  const existeNotificacion = await Notificacion.findByPk(id);
  if (!existeNotificacion) {
    return res.status(400).json({ msg: "La Notificacion no  existe en la BD" });
  }

  res.status(200).json({ ok: true, Notificacion: existeNotificacion });
};

const createNotificacion = async (req, res) => {
  const {  usuarioId, casoId, tareaId, tipo,nombre,mensaje,fechaLectura} = req.body;

  const Notificacions = new Notificacion({  usuarioId, casoId, tareaId, tipo,nombre,mensaje,fechaLectura});
 /*  const notificacion = await Notificacion.findOne({
    where: {
      nombre: Notificacions.ruc,
    },
  });

  if (Notificacion) {
    return res.status(400).json({
      msg: "La Notificacion  ya existe",
    });
  } */

  await Notificacions.save();
  res.status(201).json({ msg: "La Notificacion a sido registrado con exito" });
};

const updateNotificacion = async (req, res) => {
  const id = req.params.id;

  const existeNotificacion = await Notificacion.findByPk(id);
  if (!existeNotificacion) {
    return res.status(404).json({ ok: true, msg: "No existe la Notificacion" });
  }

  const { usuarioId, casoId, tareaId, tipo,nombre,mensaje,fechaLectura } = req.body;

   await Notificacion.update(
    {
       usuarioId, casoId, tareaId, tipo,nombre,mensaje,fechaLectura
    },
    { where: { id: id } },
  );
  res.status(200).json({
    ok: true,
    msg: `Se actualizo con exito  la Notificacion`,
    //Permiso: PermisoUpdate,
  });
};

const deleteNotificacion = async (req, res) => {
  const id = req.params.id;
  const notificacion = await Notificacion.findByPk(id);

  await notificacion.update({ estado: false });
  res.status(200).json({
    msg: "La Notificacion  a sido desactivado con exito...",
  });
};

module.exports = {
  createNotificacion,
  getNotificacion,
  getIdNotificacion,
  updateNotificacion,
  deleteNotificacion,
};
