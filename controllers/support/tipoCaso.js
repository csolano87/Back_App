const TipoCaso = require("../../models/support/tipoCaso");

const getTipoCaso = async (req, res) => {
  const tipoCaso = await TipoCaso.findAll();

  res.status(200).json({ ok: true, tipoCaso });
};

const getByIdTipoCaso = async (req, res) => {
  const { id } = req.params;
  const tipoCaso = await TipoCaso.findByPk(id);

  if (!tipoCaso) {
    return res.status(400).json({ msg: "El tipo de caso no existe en el BD" });
  }

  res.status(200).json({ ok: true, tipoCaso });
};

const createTipoCaso = async (req, res) => {
  const { nombre, descripcion } = req.body;

  const tipoCaso = new TipoCaso({ nombre, descripcion });
  const tipocaso = await TipoCaso.findOne({
    where: {
      nombre: tipoCaso.nombre,
    },
  });

  if (tipocaso) {
    return res.status(400).json({
      msg: "Este tipo de caso  ya existe",
    });
  }

  await tipoCaso.save();
  res.status(201).json({ msg: "El tipo de caso a sido registrado con exito" });
};

const updateTipoCaso = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  const tipocaso = await TipoCaso.findByPk(id);
  if (tipocaso) {
    return res.status(400).json({
      msg: "Este tipo de caso  ya existe",
    });
  }
  await tipocaso.update(
    {
      nombre,
      descripcion,
    },
    {
      where: { id: id },
    },
  );

  res.status(200).json({ msg: "El tipo de caso a sido guardado con exito" });
};

const deleteTipoCaso = async (req, res) => {
  const { id } = req.params;
  const tipoCaso = await TipoCaso.findByPk(id);

  if (!tipoCaso) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await tipoCaso.update({ estado: 0 });

  res.status(200).json({
    msg: "El tipo de caso  a sido desactivado con exito...",
  });
};

module.exports = { getTipoCaso, getByIdTipoCaso, createTipoCaso, updateTipoCaso, deleteTipoCaso };
