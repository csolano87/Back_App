const EstadoTarea = require("../../models/support/estadostarea");


const getEstadoTarea = async (req, res) => {
  const estadoTareas = await EstadoTarea.findAll({});
  res.status(200).json({ ok: true, estadoTareas });
};

const getByIdEstadoTarea = async (req, res) => {
  const { id } = req.params;
  const estadoTareas = await EstadoTarea.findByPk(id);

  if (!estadoTareas) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }

  res.status(200).json({ ok: true, estadoTareas });
};

const createEstadoTarea = async (req, res) => {
  const { codigo, nombre } = req.body;

  const estadoTareas = new EstadoTarea({ codigo, nombre });
  const estadotareas = await EstadoTarea.findOne({
    where: {
      codigo: estadoTareas.codigo,
    },
  });

  if (estadotareas) {
    return res.status(400).json({
      msg: `El estado de la tarea  ya se encuentra registrado`,
    });
  }

  await estadoTareas.save();
  res.status(201).json({ msg: "El estado de la tarea a sido registrado con exito.." });
};

const updateEstadoTarea = async (req, res) => {
  const { id } = req.params;
  const { codigo, nombre } = req.body;
  const estadotarea = await EstadoTarea.findByPk(id);

  if (!estadotarea) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await estadotarea.update(
    {
      codigo,
      nombre,
   
    },
    { where: { id: id } },
  );
  res.status(200).json("El estado tarea a sido guardada con exito..");
};

const deleteEstadoTarea = async (req, res) => {
  const { id } = req.params;
  const estadotarea = await EstadoTarea.findByPk(id);

  if (!estadotarea) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await estadotarea.update({ estado: 0 });

  res.status(200).json({
    msg: "El estado Caso a sido desactivado con exito...",
  });
};

module.exports = { getEstadoTarea, getByIdEstadoTarea, createEstadoTarea, updateEstadoTarea, deleteEstadoTarea };
