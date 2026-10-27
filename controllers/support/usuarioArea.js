const UsuarioArea = require("../../models/support/usuarioArea");

const getUsuarioArea = async (req, res) => {
  const usuarioArea = await UsuarioArea.findAll();

  res.status(200).json({ ok: true, usuarioArea });
};

const getByIdUsuarioArea = async (req, res) => {
  const { id } = req.params;
  const usuarioArea = await UsuarioArea.findByPk(id);

  if (!usuarioArea) {
    return res.status(400).json({ msg: "El usuario area  no existe en el BD" });
  }

  res.status(200).json({ ok: true, usuarioArea });
};

const createUsuarioArea = async (req, res) => {
  const { usuarioId, areaId } = req.body;

  const usuarioArea = new UsuarioArea({ usuarioId, areaId });
  const usuarioarea = await UsuarioArea.findOne({
    where: {
      usuarioId: usuarioArea.usuarioId,
      areaId: usuarioArea.areaId,
    },
  });

  if (usuarioarea) {
    return res.status(400).json({
      msg: "Es usuario area ya existe en la BD",
    });
  }

  await usuarioArea.save();
  res.status(201).json({ msg: "El usuario area a sido registrado con exito" });
};

const updateUsuarioArea = async (req, res) => {
  const { id } = req.params;
  const { usuarioId, areaId } = req.body;
  const usuarioArea = await UsuarioArea.findByPk(id);
  if (usuarioArea) {
    return res.status(400).json({
      msg: "El usuario area ya existe",
    });
  }
  await usuarioArea.update(
    {
      usuarioId,
      areaId,
    },
    {
      where: { id: id },
    },
  );

  res.status(200).json({ msg: "El usuario area a sido guardado con exito" });
};

const deleteUsuarioArea = async (req, res) => {
  const { id } = req.params;
  const usuarioArea = await UsuarioArea.findByPk(id);

  if (!usuarioArea) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await usuarioArea.update({ estado: 0 });

  res.status(200).json({
    msg: "El usuario area  de caso  a sido desactivado con exito...",
  });
};

module.exports = { getUsuarioArea, getByIdUsuarioArea, createUsuarioArea, updateUsuarioArea, deleteUsuarioArea };
