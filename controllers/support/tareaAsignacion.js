const TareaAsignada = require("../../models/support/tareaAsignada");

const getTareaAsignada = async (req, res) => {
  const tareaAsignada = await TareaAsignada.findAll({});
  res.status(200).json({ ok: true, tareaAsignada });
};

const getByIdTareaAsignada = async (req, res) => {
  const { id } = req.params;
  const tareaAsignada = await TareaAsignada.findByPk(id);

  if (!tareaAsignada) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }

  res.status(200).json({ ok: true, tareaAsignada });
};

const createTareaAsignada = async (req, res) => {
  const { tareaId, tecnicoOrigenId, tecnicoDestinoId, usuarioAsignadorId, motivo, fechaAsignacion } = req.body;

  const tareaAsignada = new TareaAsignada({ tareaId, tecnicoOrigenId, tecnicoDestinoId, usuarioAsignadorId, motivo, fechaAsignacion });
  /* const tareaAsignada = await TareaAsignada.findOne({
    where: {
      correo: TareaAsignada.nombre,
    },
  });

  if (TareaAsignada) {
    return res.status(400).json({
      msg: `El area de soporte ${TareaAsignada} ya se encuentra registrado`,
    });
  } */

  await tareaAsignada.save();
  res.status(201).json({ msg: "La tarea asignada a sido registrado con exito.." });
};

const updateTareaAsignada = async (req, res) => {
  const { id } = req.params;
  const { tareaId, tecnicoOrigenId, tecnicoDestinoId, usuarioAsignadorId, motivo, fechaAsignacion } = req.body;
  const tareaAsignada = await TareaAsignada.findByPk(id);

  if (!tareaAsignada) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await TareaAsignada.update(
    {
      tareaId,
      tecnicoOrigenId,
      tecnicoDestinoId,
      usuarioAsignadorId,
      motivo,
      fechaAsignacion,
    },
    { where: { id: id } },
  );
  res.status(200).json("La tarea asignada a sido guardada con exito..");
};

const deleteTareaAsignada = async (req, res) => {
  const { id } = req.params;
  const tareaAsignada = await TareaAsignada.findByPk(id);

  if (!tareaAsignada) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await tareaAsignada.update({ estado: 0 });

  res.status(200).json({
    msg: "La tarea asignada a sido desactivado con exito...",
  });
};

module.exports = { getTareaAsignada, getByIdTareaAsignada, createTareaAsignada, updateTareaAsignada, deleteTareaAsignada };
