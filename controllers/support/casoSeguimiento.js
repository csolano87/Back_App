const CasoSeguimiento = require("../../models/support/casoSeguimiento");

const getCasoSeguimiento = async (req, res) => {
  const casoSeguimiento = await CasoSeguimiento.findAll({});
  res.status(200).json({ ok: true, casoSeguimiento });
};

const getByIdCasoSeguimiento = async (req, res) => {
  const { id } = req.params;
  const casoSeguimiento = await CasoSeguimiento.findByPk(id);

  if (!casoSeguimiento) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }

  res.status(200).json({ ok: true, casoSeguimiento });
};

const createCasoSeguimiento = async (req, res) => {
  const { casoId, usuarioId, descripcion, esInterno } = req.body;

  const casoSeguimiento = new CasoSeguimiento({ casoId, usuarioId, descripcion, esInterno });
  /* const casoSeguimiento = await CasoSeguimiento.findOne({
    where: {
      correo: CasoSeguimiento.nombre,
    },
  });

  if (CasoSeguimiento) {
    return res.status(400).json({
      msg: `El area de soporte ${CasoSeguimiento} ya se encuentra registrado`,
    });
  } */

  await casoSeguimiento.save();
  res.status(201).json({ msg: "El seguimiento a sido registrado con exito.." });
};

const updateCasoSeguimiento = async (req, res) => {
  const { id } = req.params;
  const { casoId, usuarioId, descripcion, esInterno } = req.body;
  const casoSeguimiento = await CasoSeguimiento.findByPk(id);

  if (!casoSeguimiento) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await CasoSeguimiento.update(
    {
      casoId,
      usuarioId,
      descripcion,
      esInterno,
    },
    { where: { id: id } },
  );
  res.status(200).json("El seguimiento  a sido guardada con exito..");
};

const deleteCasoSeguimiento = async (req, res) => {
  const { id } = req.params;
  const casoSeguimiento = await CasoSeguimiento.findByPk(id);

  if (!casoSeguimiento) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await casoSeguimiento.update({ estado: 0 });

  res.status(200).json({
    msg: "El seguimiento a sido desactivado con exito...",
  });
};

module.exports = { getCasoSeguimiento, getByIdCasoSeguimiento, createCasoSeguimiento, updateCasoSeguimiento, deleteCasoSeguimiento };
