const TareaDependencia = require("../../models/support/TareaDependencia");


const getTareaDependencia = async (req, res) => {
  const tareaDependencia = await TareaDependencia.findAll({});
  res.status(200).json({ ok: true, tareaDependencia });
};

const getByIdTareaDependencia = async (req, res) => {
  const { id } = req.params;
  const tareaDependencia = await TareaDependencia.findByPk(id);

  if (!tareaDependencia) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }

  res.status(200).json({ ok: true, tareaDependencia });
};

const createTareaDependencia = async (req, res) => {
  const { tareaId, dependeDeTareaId  } = req.body;

  const tareaDependencia = new TareaDependencia({ tareaId, dependeDeTareaId });
  /* const tareadependencia = await TareaDependencia.findOne({
    where: {
      correo: TareaDependencia.nombre,
    },
  });

  if (TareaDependencia) {
    return res.status(400).json({
      msg: `El area de soporte ${TareaDependencia} ya se encuentra registrado`,
    });
  } */

  await tareaDependencia.save();
  res.status(201).json({ msg: "La tarea a sido registrado con exito.." });
};

const updateTareaDependencia = async (req, res) => {
  const { id } = req.params;
  const { tareaId, dependeDeTareaId  } = req.body;
  const tareaDependencia = await TareaDependencia.findByPk(id);

  if (!tareaDependencia) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await tareaDependencia.update(
    {
      tareaId, dependeDeTareaId 
    },
    { where: { id: id } }
  );
  res.status(200).json("la tarea  a sido guardada con exito..");
};

const deleteTareaDependencia = async (req, res) => {
  const { id } = req.params;
  const tareaDependencia = await TareaDependencia.findByPk(id);

  if (!tareaDependencia) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await tareaDependencia.update({ estado: 0 });

  res.status(200).json({
    msg: "La tarea  a sido desactivado con exito...",
  });
};

module.exports = { getTareaDependencia,getByIdTareaDependencia,createTareaDependencia,updateTareaDependencia,deleteTareaDependencia };
