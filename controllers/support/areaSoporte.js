const AreaSoporte = require("../../models/support/areaSoporte");


const getAreaSoporte = async (req, res) => {
  const areaSoporte = await AreaSoporte.findAll({});
  res.status(200).json({ ok: true, areaSoporte });
};

const getByIdAreaSoporte = async (req, res) => {
  const { id } = req.params;
  const areaSoporte = await AreaSoporte.findByPk(id);

  if (!areaSoporte) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }

  res.status(200).json({ ok: true, areaSoporte });
};

const createAreaSoporte = async (req, res) => {
  const { nombre,descripcion } = req.body;

  const areaSoporte = new AreaSoporte({ nombre, descripcion });
  const areasoporte = await AreaSoporte.findOne({
    where: {
      correo: areaSoporte.nombre,
    },
  });

  if (areasoporte) {
    return res.status(400).json({
      msg: `El area de soporte ${areasoporte} ya se encuentra registrado`,
    });
  }

  await areaSoporte.save();
  res.status(201).json({ msg: "El area de soporte a sido registrado con exito.." });
};

const updateAreaSoporte = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  const areaSoporte = await AreaSoporte.findByPk(id);

  if (!areaSoporte) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await areaSoporte.update(
    {
      nombre,
    descripcion
    },
    { where: { id: id } }
  );
  res.status(200).json("El area de soporte  a sido guardada con exito..");
};

const deleteAreaSoporte = async (req, res) => {
  const { id } = req.params;
  const areaSoporte = await AreaSoporte.findByPk(id);

  if (!areaSoporte) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await areaSoporte.update({ estado: 0 });

  res.status(200).json({
    msg: "El area de soporte a sido desactivado con exito...",
  });
};

module.exports = { getAreaSoporte,getByIdAreaSoporte,createAreaSoporte,updateAreaSoporte,deleteAreaSoporte };
