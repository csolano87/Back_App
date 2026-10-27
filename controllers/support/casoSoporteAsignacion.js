const CasoAsignacion = require("../../models/support/casoSoporteAsignacion");

const getCasoAsignacion = async (req, res) => {
  const casoAsignacion = await CasoAsignacion.findAll();

  res.status(200).json({ ok: true, casoAsignacion });
};

const getByIdCasoAsignacion = async (req, res) => {
  const { id } = req.params;
  const casoAsignacion = await CasoAsignacion.findByPk(id);

  if (!casoAsignacion) {
    return res.status(400).json({ msg: "La asignacion del caso no existe en el BD" });
  }

  res.status(200).json({ ok: true, casoAsignacion });
};

const createCasoAsignacion = async (req, res) => {
  const { casoId, motivo, usuarioOrigenId,  usuarioDestinoId, usuarioAsignadorId, fechaAsignacion } = req.body;

  const casoAsignacion = new CasoAsignacion({
    casoId,
    motivo,
    usuarioOrigenId,
    usuario,
    usuarioDestinoId,
    usuarioAsignadorId,
    fechaAsignacion,
  });
  const casoasignacion = await CasoAsignacion.findOne({
    where: {
      casoId: casoAsignacion.casoId,
      usuarioDestinoId: casoAsignacion.usuarioDestinoId,
    },
  });

  if (casoasignacion) {
    return res.status(400).json({
      msg: "Existe una asignacion al usuario ",
    });
  }

  await casoasignacion.save();
  res.status(201).json({ msg: "Se asigno correctamente el caso  con exito" });
};

const updateCasoAsignacion = async (req, res) => {
  const { id } = req.params;
  const { casoId, motivo, usuarioOrigenId, usuario, usuarioDestinoId, usuarioAsignadorId, fechaAsignacion } = req.body;
  const casoAsignacion = await CasoAsignacion.findByPk(id);
  if (!casoAsignacion) {
    return res.status(400).json({
      msg: "El caso no existe",
    });
  }
  await casoAsignacion.update(
    {
      casoId,
      motivo,
      usuarioOrigenId,
      usuario,
      usuarioDestinoId,
      usuarioAsignadorId,
      fechaAsignacion,
    },
    {
      where: { id: id },
    },
  );

  res.status(200).json({ msg: "El caso asigando  a sido guardado con exito" });
};

const deleteCasoAsignacion = async (req, res) => {
  const { id } = req.params;
  const casoAsignacion = await CasoAsignacion.findByPk(id);

  if (!casoAsignacion) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await casoAsignacion.update({ estado: 0 });

  res.status(200).json({
    msg: "El caso asigando  a sido desactivado con exito...",
  });
};

module.exports = { getCasoAsignacion, getByIdCasoAsignacion, createCasoAsignacion, updateCasoAsignacion, deleteCasoAsignacion };
