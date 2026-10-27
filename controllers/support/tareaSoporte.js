const TareaSoporte = require("../../models/support/tareaSoporte");


const getTareaSoporte = async (req, res) => {
  const tareaSoporte = await TareaSoporte.findAll({});
  res.status(200).json({ ok: true, tareaSoporte });
};

const getByIdTareaSoporte = async (req, res) => {
  const { id } = req.params;
  const tareaSoporte = await TareaSoporte.findByPk(id);

  if (!tareaSoporte) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }

  res.status(200).json({ ok: true, tareaSoporte });
};

const createTareaSoporte = async (req, res) => {
  const {
    casoId,
    areaSoporteId,
    tecnicoId,
    tipoSoporteId,
    modalidadId,
    estadoTareaId,
    nombre,  
    descripcion,
    fechaInicioReal,
    tipocasoId,
    responsableActualId,
    estadoCasoId,

    
  } = req.body;

  const tareaSoporte = new TareaSoporte({
    casoId,
    areaSoporteId,
    tecnicoId,
    tipoSoporteId,
    modalidadId,
    estadoTareaId,
    nombre,  
    descripcion,
    fechaInicioReal,
    tipocasoId,
    responsableActualId,
    estadoCasoId,
  });
 /*  const tareasoporte = await TareaSoporte.findOne({
    where: {
      numeroCaso: TareaSoporte.numeroCaso,
    },
  });

  if (tareasoporte) {
    return res.status(400).json({
      msg: `El caso soporte  ${numeroCaso} ya se encuentra registrado`,
    });
  } */

  await tareaSoporte.save();
  res.status(201).json({ msg: "La tarea del caso  a sido registrado con exito.." });
};

const updateTareaSoporte = async (req, res) => {
  const { id } = req.params;
  const {
   casoId,
    areaSoporteId,
    tecnicoId,
    tipoSoporteId,
    modalidadId,
    estadoTareaId,
    nombre,  
    descripcion,
    fechaInicioReal,
    tipocasoId,
    responsableActualId,
    estadoCasoId,
  } = req.body;
  const tareaSoporte = await TareaSoporte.findByPk(id);

  if (!tareaSoporte) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await tareaSoporte.update(
    {
    casoId,
    areaSoporteId,
    tecnicoId,
    tipoSoporteId,
    modalidadId,
    estadoTareaId,
    nombre,  
    descripcion,
    fechaInicioReal,
    tipocasoId,
    responsableActualId,
    estadoCasoId,
    },
    { where: { id: id } },
  );
  res.status(200).json("El caso soporte a sido guardada con exito..");
};

const deleteTareaSoporte = async (req, res) => {
  const { id } = req.params;
  const tareaSoporte = await TareaSoporte.findByPk(id);

  if (!tareaSoporte) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await tareaSoporte.update({ estado: 0 });

  res.status(200).json({
    msg: "La tarea de soporte sido desactivado con exito...",
  });
};

module.exports = { getTareaSoporte, getByIdTareaSoporte, createTareaSoporte, updateTareaSoporte, deleteTareaSoporte };
