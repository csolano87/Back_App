const Tipo_Adquisicion = require("../../models/inventory/tipo_adquision");

const getTipoAdquision = async (req, res) => {
  const tipo_Adquisicion = await Tipo_Adquisicion.findAll();

  res.status(200).json({ ok: true, tipo_Adquisicion });
};

const getIdTipoAdquision = async (req, res) => {
  const { id } = req.params;
  const existeTipoAdquision = await Tipo_Adquisicion.findByPk(id);
  if (!existeTipoAdquision) {
    return res.status(400).json({ msg: "El tipo de adquision no  existe en la BD" });
  }

  res.status(200).json({ ok: true, tipo_Adquisicion: existeTipoAdquision });
};

const createTipoAdquision = async (req, res) => {
  const { nombre } = req.body;

  const tipo_Adquisicion = new Tipo_Adquisicion({ nombre });
  const tipo_adquisicion = await Tipo_Adquisicion.findOne({
    where: {
      nombre: tipo_Adquisicion.nombre,
    },
  });

  if (tipo_adquisicion) {
    return res.status(400).json({
      msg: "El tipo de adquision ya existe",
    });
  }

  await tipo_Adquisicion.save();
  res.status(201).json({ msg: "El tipo de adquision a sido registrado con exito" });
};

const updateTipoAdquision = async (req, res) => {
  const id = req.params.id;

  const existeTipoAdquision = await Tipo_Adquisicion.findByPk(id);
  if (!existeTipoAdquision) {
    return res.status(404).json({ ok: true, msg: "No existe el tipo de adquision" });
  }

  const { nombre } = req.body;

  await Tipo_Adquisicion.update(
    {
      nombre,
    },
    { where: { id: id } },
  );
  res.status(200).json({ ok: true, msg: `Se actualizo con exito  el tipo de adquision` });
};

const deleteTipoAdquision = async (req, res) => {
  const id = req.params.id;
  const tipo_Adquisicion = await Tipo_Adquisicion.findByPk(id);
  if (!tipo_Adquisicion) {
    return res.status(404).json({
      msg: `No existe el tipo de adquision con el id ${id}`,
    });
  }
  await Tipo_Adquisicion.update({ estado: false });
  res.status(200).json({
    msg: "El tipo de adquision a sido desactivado con exito...",
  });
};

module.exports = {
  createTipoAdquision,
  getIdTipoAdquision,
  getTipoAdquision,
  updateTipoAdquision,
  deleteTipoAdquision,
};
