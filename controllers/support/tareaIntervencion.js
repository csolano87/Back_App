const TareaIntervencion = require("../../models/support/tareaIntervencion");



const getTareaIntervencion= async (req, res) => {
  const tareaIntervencion= await TareaIntervencion.findAll({});
  res.status(200).json({ ok: true, tareaIntervencion});
};

const getByIdTareaIntervencion= async (req, res) => {
  const { id } = req.params;
  const tareaIntervencion= await TareaIntervencion.findByPk(id);

  if (!tareaDependencia) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }

  res.status(200).json({ ok: true, tareaIntervencion});
};

const createTareaIntervencion= async (req, res) => {
  const { tareaId, tecnicoId,modalidadId, canalId,descripcion,fechaInicio} = req.body;

  const tareaIntervencion= new TareaDependencia({ tareaId, tecnicoId,modalidadId, canalId,descripcion,fechaInicio });
  /* const tareaIntervencion= await TareaDependencia.findOne({
    where: {
      correo: TareaDependencia.nombre,
    },
  });

  if (TareaDependencia) {
    return res.status(400).json({
      msg: `El area de soporte ${TareaDependencia} ya se encuentra registrado`,
    });
  } */

  await tareaIntervencion.save();
  res.status(201).json({ msg: "La tarea intervencion a sido registrado con exito.." });
};

const updateTareaIntervencion= async (req, res) => {
  const { id } = req.params;
  const { tareaId, tecnicoId,modalidadId, canalId,descripcion,fechaInicio } = req.body;
  const tareaIntervencion= await tareaIntervencion.findByPk(id);

  if (!tareaIntervencion) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await tareaIntervencion.update(
    {
      tareaId, tecnicoId,modalidadId, canalId,descripcion,fechaInicio 
    },
    { where: { id: id } }
  );
  res.status(200).json("La tarea intervencion  a sido guardada con exito..");
};

const deleteTareaIntervencion= async (req, res) => {
  const { id } = req.params;
  const tareaIntervencion= await tareaIntervencion.findByPk(id);

  if (!tareaIntervencion) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await tareaIntervencion.update({ estado: 0 });

  res.status(200).json({
    msg: "La tarea intervencion a sido desactivado con exito...",
  });
};

module.exports = { getTareaIntervencion,createTareaIntervencion,deleteTareaIntervencion,getByIdTareaIntervencion,updateTareaIntervencion};
