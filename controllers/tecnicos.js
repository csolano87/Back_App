
const Tecnico = require("../models/tecnicos");

const getAll = async (req, res) => {
  const tecnicos = await Tecnico.findAll({});
  res.status(200).json({ ok: true, tecnicos });
};

const GetById = async (req, res) => {
  const { id } = req.params;
  const tecnico = await Tecnico.findByPk(id);

  if (!tecnico) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }

  res.status(200).json({ ok: true, tecnico });
};

const post = async (req, res) => {
  const { nombres, apellidos, correo, telefono } = req.body;

  const tecnicos = new Tecnico({ nombres, apellidos, correo, telefono });
  const tecnico = await Tecnico.findOne({
    where: {
      correo: tecnicos.correo,
    },
  });

  if (tecnico) {
    return res.status(400).json({
      msg: `El correo ${correo} ya se encuentra registrado`,
    });
  }

  await tecnicos.save();
  res.status(201).json({ msg: "El tecnico a sido registrado con exito.." });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { nombres, apellidos, correo, telefono } = req.body;
  const tecnico = await Tecnico.findByPk(id);

  if (!tecnico) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await Tecnico.update(
    {
      nombres,
      apellidos,
      correo,
      telefono,
    },
    { where: { id: id } }
  );
  res.status(200).json("El tecnico a sido guardada con exito..");
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const tecnico = await Tecnico.findByPk(id);

  if (!tecnico) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await tecnico.update({ estado: 0 });

  res.status(200).json({
    msg: "El tecnico a sido desactivado con exito...",
  });
};

module.exports = { getAll, GetById, post, update, deleteById };
