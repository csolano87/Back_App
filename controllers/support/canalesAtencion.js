const CanalAtencion = require("../../models/support/canalesAtencion");

const getCanalAtencion = async (req, res) => {
  const canalAtencion = await CanalAtencion.findAll({});
  res.status(200).json({ ok: true, canalAtencion });
};

const getByIdCanalAtencion = async (req, res) => {
  const { id } = req.params;
  const canalAtencion = await CanalAtencion.findByPk(id);

  if (!canalAtencion) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }

  res.status(200).json({ ok: true, canalAtencion });
};

const createCanalAtencion = async (req, res) => {
  const { nombre } = req.body;

  const canalAtencion = new CanalAtencion({ nombre });
  const canalatencion = await CanalAtencion.findOne({
    where: {
      nombre: canalAtencion.nombre,
    },
  });

  if (canalAtencion) {
    return res.status(400).json({
      msg: `El canal de atencion   ${correo} ya se encuentra registrado`,
    });
  }

  await canalAtencion.save();
  res.status(201).json({ msg: "El canal de atencion  a sido registrado con exito.." });
};

const updateCanalAtencion = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const canalAtencion = await CanalAtencion.findByPk(id);

  if (!canalAtencion) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await canalAtencion.update(
    {
      nombre,
    },
    { where: { id: id } },
  );
  res.status(200).json("El canal atencion a sido guardada con exito..");
};

const deleteCanalAtencion = async (req, res) => {
  const { id } = req.params;
  const canalAtencion = await CanalAtencion.findByPk(id);

  if (!canalAtencion) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await canalAtencion.update({ estado: 0 });

  res.status(200).json({
    msg: "El canal de atencion a sido desactivado con exito...",
  });
};

module.exports = { getCanalAtencion, getByIdCanalAtencion, createCanalAtencion, updateCanalAtencion, deleteCanalAtencion };
