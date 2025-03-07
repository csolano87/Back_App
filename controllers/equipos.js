const Equipo = require("../models/equipos");

const getAll = async (req, res) => {
  const equipos = await Equipo.findAll({});
  res.status(200).json({ ok: true, equipos });
};

const GetById = async (req, res) => {
  const { id } = req.params;
  const equipo = await Equipo.findByPk(id);

  if (!equipo) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }

  res.status(200).json({ ok: true, equipo });
};

const post = async (req, res) => {
  const { nombre, serie, descripcion } = req.body;

  const equipos = new Equipo({ nombre, serie, descripcion });
  const equipo = await Equipo.findOne({
    where: {
      serie: equipos.serie,
    },
  });

  if (equipo) {
    return res.status(400).json({
      msg: `La serie ${serie} ya se encuentra registrado`,
    });
  }

  await equipos.save();
  res.status(201).json({ msg: "El equipo a sido registrado con exito.." });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { nombre, serie, descripcion } = req.body;
  const equipo = await Equipo.findByPk(id);

  if (!equipo) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await Equipo.update(
    {
      nombre,
      serie,
      descripcion,
    },
    { where: { id: id } }
  );
  res.status(200).json("El equipo a sido guardada con exito..");
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const equipo = await Equipo.findByPk(id);

  if (!equipo) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await equipo.update({ estado: 0 });

  res.status(200).json({
    msg: "El cliente a sido desactivado con exito...",
  });
};

module.exports = { getAll, GetById, post, update, deleteById };
