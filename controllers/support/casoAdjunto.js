const CasoAdjunto = require("../../models/support/casoAdjunto");

const getCasoAdjunto = async (req, res) => {
  const casoAdjunto = await CasoAdjunto.findAll({});
  res.status(200).json({ ok: true, casoAdjunto });
};

const getByIdCasoAdjunto = async (req, res) => {
  const { id } = req.params;
  const casoAdjunto = await CasoAdjunto.findByPk(id);

  if (!casoAdjunto) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }

  res.status(200).json({ ok: true, casoAdjunto });
};

const createCasoAdjunto = async (req, res) => {
  const { casoId, usuarioId, nombreOriginal, rutaArchivo, mimeType, tamanioBytes, descripcion } = req.body;

  const casoAdjunto = new CasoAdjunto({ casoId, usuarioId, nombreOriginal, rutaArchivo, mimeType, tamanioBytes, descripcion });
  /* const casoAdjunto = await CasoAdjunto.findOne({
    where: {
      correo: CasoAdjunto.nombre,
    },
  });

  if (CasoAdjunto) {
    return res.status(400).json({
      msg: `El area de soporte ${CasoAdjunto} ya se encuentra registrado`,
    });
  } */

  await casoAdjunto.save();
  res.status(201).json({ msg: "El adjunto a sido registrado con exito.." });
};

const updateCasoAdjunto = async (req, res) => {
  const { id } = req.params;
  const { casoId, usuarioId, nombreOriginal, rutaArchivo, mimeType, tamanioBytes, descripcion } = req.body;
  const casoAdjunto = await CasoAdjunto.findByPk(id);

  if (!CasoAdjunto) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await CasoAdjunto.update(
    {
      casoId,
      usuarioId,
      nombreOriginal,
      rutaArchivo,
      mimeType,
      tamanioBytes,
      descripcion,
    },
    { where: { id: id } },
  );
  res.status(200).json("El adjunto a sido guardada con exito..");
};

const deleteCasoAdjunto = async (req, res) => {
  const { id } = req.params;
  const casoAdjunto = await CasoAdjunto.findByPk(id);

  if (!casoAdjunto) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await casoAdjunto.update({ estado: 0 });

  res.status(200).json({
    msg: "El adjunto  a sido desactivado con exito...",
  });
};

module.exports = { getCasoAdjunto, getByIdCasoAdjunto, createCasoAdjunto, updateCasoAdjunto, deleteCasoAdjunto };
