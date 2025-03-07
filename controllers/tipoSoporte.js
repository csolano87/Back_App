const TipoSoporte = require("../models/tipoSoporte");



const getAll = async (req, res) => {
  const tipoSoportes = await TipoSoporte.findAll({});
  res.status(200).json({ ok: true, tipoSoportes });
};

const GetById = async (req, res) => {
  const { id } = req.params;
  const tipoSoporte = await TipoSoporte.findByPk(id);

  if (!tipoSoporte) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }

  res.status(200).json({ ok: true, tipoSoporte });
};

const post = async (req, res) => {
  const { nombre } = req.body;

  const tipoSoportes = new TipoSoporte ({ nombre});
  const tipoSoporte = await TipoSoporte.findOne({
    where: {
      nombre: tipoSoportes.nombre,
    },
  });

  if (tipoSoporte) {
    return res.status(400).json({
      msg: `El nombre ${nombre} ya se encuentra registrado`,
    });
  }

  await tipoSoportes.save();
  res.status(201).json({ msg: "El tipoSoporte a sido registrado con exito.." });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const tipoSoporte = await TipoSoporte.findByPk(id);

  if (!tipoSoporte) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await TipoSoporte.update(
    {
      nombre
    },
    { where: { id: id } }
  );
  res.status(200).json({ok: false, msg:"El tipoSoporte a sido guardada con exito.."});
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const tipoSoporte = await TipoSoporte.findByPk(id);

  if (!tipoSoporte) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await tipoSoporte.update({ estado: 0 });

  res.status(200).json({
    msg: "El tipoSoporte a sido desactivado con exito...",
  });
};

module.exports = { getAll, GetById, post, update, deleteById };
