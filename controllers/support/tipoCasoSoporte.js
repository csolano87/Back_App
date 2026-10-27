const TipoSoporte = require("../../models/support/tipoCasoSoporte");

const getTipoSoporte = async (req, res) => {
  const tipoSoporte = await TipoSoporte.findAll();

  res.status(200).json({ ok: true, tipoSoporte });
};

const getByIdTipoSoporte = async (req, res) => {
  const { id } = req.params;
  const tipoSoporte = await TipoSoporte.findByPk(id);

  if (!tipoSoporte) {
    return res.status(400).json({ msg: "El tipo de soporte no existe en el BD" });
  }

  res.status(200).json({ ok: true, tipoSoporte });
};

const createTipoSoporte = async (req, res) => {
  const { nombre, descripcion } = req.body;

  const tipoSoporte = new TipoSoporte({
    nombre,
    descripcion,
  });
  const tiposoporte = await TipoSoporte.findOne({
    where: {
      nombre: tipoSoporte.nombre,
      //  usuarioDestinoId: TipoSoporte.usuarioDestinoId,
    },
  });

  if (tiposoporte) {
    return res.status(400).json({
      msg: "El tipo de soporte ya existe  ",
    });
  }

  await tipoSoporte.save();
  res.status(201).json({ msg: "Se tipo de soporte se guardo   con exito" });
};

const updateTipoSoporte = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  const tipoSoporte = await TipoSoporte.findByPk(id);
  if (!tipoSoporte) {
    return res.status(400).json({
      msg: "El tipode soporte no existe",
    });
  }
  await tipoSoporte.update(
    {
      nombre,
      descripcion,
    },
    {
      where: { id: id },
    },
  );

  res.status(200).json({ msg: "El tipo de soporte a sido guardado con exito" });
};

const deleteTipoSoporte = async (req, res) => {
  const { id } = req.params;
  const tipoSoporte = await TipoSoporte.findByPk(id);

  if (!tipoSoporte) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await tipoSoporte.update({ estado: 0 });

  res.status(200).json({
    msg: "El tipo de soporte a sido desactivado con exito...",
  });
};

module.exports = {
  getTipoSoporte,
  getByIdTipoSoporte,
  createTipoSoporte,
  updateTipoSoporte,
  deleteTipoSoporte,
};
