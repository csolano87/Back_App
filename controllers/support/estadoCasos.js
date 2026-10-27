const EstadoCaso = require("../../models/support/estadoCasos");

const getEstadoCaso = async (req, res) => {
  const estadoCasos = await EstadoCaso.findAll({});
  res.status(200).json({ ok: true, estadoCasos });
};

const getByIdEstadoCaso = async (req, res) => {
  const { id } = req.params;
  const estadoCaso = await EstadoCaso.findByPk(id);

  if (!estadoCaso) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }

  res.status(200).json({ ok: true, estadoCaso });
};

const createEstadoCaso = async (req, res) => {
  const { codigo, nombre, descripcion } = req.body;

  const estadoCasos = new EstadoCaso({ codigo, nombre, descripcion });
  const estadocaso = await EstadoCaso.findOne({
    where: {
      codigo: estadoCasos.codigo,
    },
  });

  if (estadocaso) {
    return res.status(400).json({
      msg: `El estado del caso  ${correo} ya se encuentra registrado`,
    });
  }

  await estadocaso.save();
  res.status(201).json({ msg: "El estado del caso  a sido registrado con exito.." });
};

const updateEstadoCaso = async (req, res) => {
  const { id } = req.params;
  const { codigo, nombre, descripcion } = req.body;
  const estadoCaso = await EstadoCaso.findByPk(id);

  if (!estadoCaso) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await estadoCaso.update(
    {
      codigo,
      nombre,
      descripcion,
    },
    { where: { id: id } },
  );
  res.status(200).json("El EstadoCaso a sido guardada con exito..");
};

const deleteEstadoCaso = async (req, res) => {
  const { id } = req.params;
  const estadoCaso = await EstadoCaso.findByPk(id);

  if (!estadoCaso) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await estadoCaso.update({ estado: 0 });

  res.status(200).json({
    msg: "El estado Caso a sido desactivado con exito...",
  });
};

module.exports = { getEstadoCaso, getByIdEstadoCaso, createEstadoCaso, updateEstadoCaso, deleteEstadoCaso };
