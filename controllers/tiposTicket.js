const TipoTicket = require("../models/tiposTicket");



const getAll = async (req, res) => {
  const tipoTickets = await TipoTicket.findAll({});
  res.status(200).json({ ok: true, tipoTickets });
};

const GetById = async (req, res) => {
  const { id } = req.params;
  const tipoTicket = await TipoTicket.findByPk(id);

  if (!tipoTicket) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }

  res.status(200).json({ ok: true, tipoTicket });
};

const post = async (req, res) => {
  const { nombre } = req.body;

  const tipoTickets = new TipoTicket ({ nombre});
  const tipoTicket = await TipoTicket.findOne({
    where: {
      nombre: tipoTickets.nombre,
    },
  });

  if (tipoTicket) {
    return res.status(400).json({
      msg: `El nombre ${nombre} ya se encuentra registrado`,
    });
  }

  await tipoTickets.save();
  res.status(201).json({ msg: "El tipoTicket a sido registrado con exito.." });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const tipoTicket = await TipoTicket.findByPk(id);

  if (!tipoTicket) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await TipoTicket.update(
    {
      nombre
    },
    { where: { id: id } }
  );
  res.status(200).json({ok: false, msg:"El tipoTicket a sido guardada con exito.."});
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const tipoTicket = await TipoTicket.findByPk(id);

  if (!tipoTicket) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await tipoTicket.update({ estado: 0 });

  res.status(200).json({
    msg: "El tipoTicket a sido desactivado con exito...",
  });
};

module.exports = { getAll, GetById, post, update, deleteById };
