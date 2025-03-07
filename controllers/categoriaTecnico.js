const CategoriaTecnico = require("../models/categoriaTecnico");




const getAll = async (req, res) => {
  const categoriaTecnicos = await CategoriaTecnico.findAll({});
  res.status(200).json({ ok: true, categoriaTecnicos });
};

const GetById = async (req, res) => {
  const { id } = req.params;
  const categoriaTecnico = await CategoriaTecnico.findByPk(id);

  if (!categoriaTecnico) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }

  res.status(200).json({ ok: true, categoriaTecnico });
};

const post = async (req, res) => {
  const { nombre } = req.body;

  const categoriaTecnicos = new CategoriaTecnico ({ nombre});
  const categoriaTecnico = await CategoriaTecnico.findOne({
    where: {
      nombre: categoriaTecnicos.nombre,
    },
  });

  if (categoriaTecnico) {
    return res.status(400).json({
      msg: `El nombre ${nombre} ya se encuentra registrado`,
    });
  }

  await categoriaTecnicos.save();
  res.status(201).json({ msg: "El categoriaTecnico a sido registrado con exito.." });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const categoriaTecnico = await CategoriaTecnico.findByPk(id);

  if (!categoriaTecnico) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await CategoriaTecnico.update(
    {
      nombre
    },
    { where: { id: id } }
  );
  res.status(200).json({ok: false, msg:"El categoriaTecnico a sido guardada con exito.."});
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const categoriaTecnico = await CategoriaTecnico.findByPk(id);

  if (!categoriaTecnico) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await CategoriaTecnico.update({ estado: 0 });

  res.status(200).json({
    msg: "El categoriaTecnico a sido desactivado con exito...",
  });
};

module.exports = { getAll, GetById, post, update, deleteById };
