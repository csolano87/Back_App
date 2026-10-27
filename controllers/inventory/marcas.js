const Marca = require("../../models/inventory/marcas");

const getMarcas = async (req, res) => {
  const marcas = await Marca.findAll();

  res.status(200).json({ ok: true, marcas });
};

const getIdMarcas = async (req, res) => {
  const { id } = req.params;
  const existeMarca = await Marca.findByPk(id);
  if (!existeMarca) {
    return res.status(400).json({ msg: "La marca de equipo no  existe en la BD" });
  }

  res.status(200).json({ ok: true, marca: existeMarca });
};

const createMarca = async (req, res) => {
  const { nombre } = req.body;
  console.log("---- marca",nombre);
  const marcas = new Marca({ nombre });
  const marca = await Marca.findOne({
    where: {
      nombre: marcas.nombre,
    },
  });
  console.log("controller marca",marca);
  if (marca) {
    return res.status(400).json({
      msg: "La marca  del equipo ya existe",
    });
  }

  await marcas.save();
  res.status(201).json({ msg: "La marca del equipo a sido registrado con exito" });
};

const updateMarca = async (req, res) => {
  const id = req.params.id;

  const existeMarca = await Marca.findByPk(id);
  if (!existeMarca) {
    return res.status(404).json({ ok: true, msg: "No existe la marca de equipo " });
  }

  const { nombre } = req.body;

  await Marca.update(
    {
      nombre,
    },
    { where: { id: id } },
  );
  res.status(200).json({ ok: true, msg: `Se actualizo con exito  la marca de equipo ` });
};

const deleteMarca = async (req, res) => {
  const id = req.params.id;
  const marca = await Marca.findByPk(id);
  if (!marca) {
    return res.status(404).json({
      msg: `No existe la marca de equipo  con el id ${id}`,
    });
  }
  await marca.update({ estado: false });
  res.status(200).json({
    msg: "El area de equipo  a sido desactivado con exito...",
  });
};

module.exports = {
  getMarcas,
  getIdMarcas,
  createMarca,
  updateMarca,
  deleteMarca,
};
