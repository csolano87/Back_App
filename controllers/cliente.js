const Cliente = require("../models/cliente");

const getAll = async (req, res) => {
  const clientes = await Cliente.findAll({});
  res.status(200).json({ ok: true, clientes });
};

const GetById = async (req, res) => {
  const { id } = req.params;
  const cliente = await Cliente.findByPk(id);

  if (!cliente) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }

  res.status(200).json({ ok: true, cliente });
};

const post = async (req, res) => {
  const { nombres, apellidos, correo, telefono } = req.body;

  const clientes = new Cliente({ nombres, apellidos, correo, telefono });
  const cliente = await Cliente.findOne({
    where: {
      correo: clientes.correo,
    },
  });

  if (cliente) {
    return res.status(400).json({
      msg: `El correo ${correo} ya se encuentra registrado`,
    });
  }

  await clientes.save();
  res.status(201).json({ msg: "El cliente a sido registrado con exito.." });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { nombres, apellidos, correo, telefono } = req.body;
  const cliente = await Cliente.findByPk(id);

  if (!cliente) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await Cliente.update(
    {
      nombres,
      apellidos,
      correo,
      telefono,
    },
    { where: { id: id } }
  );
  res.status(200).json("El cliente a sido guardada con exito..");
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const cliente = await Cliente.findByPk(id);

  if (!cliente) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await cliente.update({ estado: 0 });

  res.status(200).json({
    msg: "El cliente a sido desactivado con exito...",
  });
};

module.exports = { getAll, GetById, post, update, deleteById };
