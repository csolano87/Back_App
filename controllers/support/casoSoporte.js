const CasoSoporte = require("../../models/support/casoSoporte");

const getCasoSoporte = async (req, res) => {
  const casoSoportes = await CasoSoporte.findAll({});
  res.status(200).json({ ok: true, casoSoportes });
};

const getByIdCasoSoporte = async (req, res) => {
  const { id } = req.params;
  const casoSoporte = await CasoSoporte.findByPk(id);

  if (!casoSoporte) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }

  res.status(200).json({ ok: true, casoSoporte });
};

const createCasoSoporte = async (req, res) => {
  const {
    numeroCaso,
    empresaId,
    equipoId,
    usuarioSolicitanteId,
    tipocasoId,
    responsableActualId,
    estadoCasoId,

    asunto,
    descripcion,
    prioridad,
    fechaApertura,
    // fechaSolucion,
    // fechaCierre,
    observacionCierre,
  } = req.body;

  const casoSoporte = new CasoSoporte({
    numeroCaso,
    empresaId,
    equipoId,
    usuarioSolicitanteId,
    tipocasoId,
    responsableActualId,
    estadoCasoId,

    asunto,
    descripcion,
    prioridad,
    fechaApertura,
    // fechaSolucion,
    // fechaCierre,
    observacionCierre,
  });
  const casosoporte = await CasoSoporte.findOne({
    where: {
      numeroCaso: casoSoporte.numeroCaso,
    },
  });

  if (casosoporte) {
    return res.status(400).json({
      msg: `El caso soporte  ${numeroCaso} ya se encuentra registrado`,
    });
  }

  await casosoporte.save();
  res.status(201).json({ msg: "El caso soporte a sido registrado con exito.." });
};

const updateCasoSoporte = async (req, res) => {
  const { id } = req.params;
  const {
    numeroCaso,
    empresaId,
    equipoId,
    usuarioSolicitanteId,
    tipocasoId,
    responsableActualId,
    estadoCasoId,

    asunto,
    descripcion,
    prioridad,
    fechaApertura,
    // fechaSolucion,
    // fechaCierre,
    observacionCierre,
  } = req.body;
  const casoSoporte = await CasoSoporte.findByPk(id);

  if (!casoSoporte) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await casoSoporte.update(
    {
      numeroCaso,
      empresaId,
      equipoId,
      usuarioSolicitanteId,
      tipocasoId,
      responsableActualId,
      estadoCasoId,

      asunto,
      descripcion,
      prioridad,
      fechaApertura,
      // fechaSolucion,
      // fechaCierre,
      observacionCierre,
    },
    { where: { id: id } },
  );
  res.status(200).json("El caso soporte a sido guardada con exito..");
};

const deleteCasoSoporte = async (req, res) => {
  const { id } = req.params;
  const casoSoporte = await CasoSoporte.findByPk(id);

  if (!casoSoporte) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await casoSoporte.update({ estado: 0 });

  res.status(200).json({
    msg: "El caso a sido desactivado con exito...",
  });
};

module.exports = { getCasoSoporte, getByIdCasoSoporte, createCasoSoporte, updateCasoSoporte, deleteCasoSoporte };
