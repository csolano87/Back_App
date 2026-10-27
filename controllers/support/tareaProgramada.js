const TareaProgramada = require("../../models/support/TareaProgramada");

const getTareaProgramada = async (req, res) => {
  const tareaProgramada = await TareaProgramada.findAll({});
  res.status(200).json({ ok: true, tareaProgramada });
};

const getByIdTareaProgramada = async (req, res) => {
  const { id } = req.params;
  const tareaProgramada = await TareaProgramada.findByPk(id);

  if (!tareaProgramada) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }

  res.status(200).json({ ok: true, tareaProgramada });
};

const createTareaProgramada = async (req, res) => {
  const { tareaId, fechaInicio, usuarioProgramadorId } = req.body;

  const tareaProgramada = new TareaProgramada({ tareaId, fechaInicio, usuarioProgramadorId });
  /*  const tareaprogramada = await TareaProgramada.findOne({
    where: {
      correo: TareaProgramada.nombre,
    },
  });

  if (tareaprogramada) {
    return res.status(400).json({
      msg: `El area de soporte ${TareaProgramada} ya se encuentra registrado`,
    });
  } */

  await tareaProgramada.save();
  res.status(201).json({ msg: "La tarea programada a sido registrado con exito.." });
};

const updateTareaProgramada = async (req, res) => {
  const { id } = req.params;
  const { tareaId, fechaInicio, usuarioProgramadorId } = req.body;
  const tareaProgramada = await TareaProgramada.findByPk(id);

  if (!tareaProgramada) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await tareaProgramada.update(
    {
      tareaId,
      fechaInicio,
      usuarioProgramadorId,
    },
    { where: { id: id } },
  );
  res.status(200).json("La tarea programada  a sido guardada con exito..");
};

const deleteTareaProgramada = async (req, res) => {
  const { id } = req.params;
  const tareaProgramada = await TareaProgramada.findByPk(id);

  if (!tareaProgramada) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await tareaProgramada.update({ estado: 0 });

  res.status(200).json({
    msg: "La tarea programada a sido desactivado con exito...",
  });
};

module.exports = { getTareaProgramada, getByIdTareaProgramada, createTareaProgramada, updateTareaProgramada, deleteTareaProgramada };
