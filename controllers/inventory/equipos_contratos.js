const Equipo_Contrato = require("../../models/inventory/equipos_contratos");




const getEstadoContrato = async (req, res) => {
  const estadoContrato = await Equipo_Contrato.findAll();

  res.status(200).json({ ok: true, estadoContrato });
};

const getIdEstadoContrato = async (req, res) => {
  const { id } = req.params;
  const existeEstadoContrato = await Estado_Equipo.findByPk(id);
  if (!existeEstadoContrato) {
    return res.status(400).json({ msg: "El estado contrato no  existe en la BD" });
  }

  res.status(200).json({ ok: true, estadoContrato: existeEstadoContrato });
};

const createEstadoContrato = async (req, res) => {
  const { numeroContrato,  fechaInicio,fechaFin ,fechaTransferencia} = req.body;

  const estadoContrato = new Estado_Equipo({ numeroContrato,  fechaInicio,fechaFin ,fechaTransferencia});
  const estadocontrato = await Estado_Equipo.findOne({
    where: {
      nombre: estadoContrato.numeroContrato,
    },
  });

  if (estadocontrato) {
    return res.status(400).json({
      msg: "El estado contrato ya existe",
    });
  }

  await estadoContrato.save();
  res.status(201).json({ msg: "El estado contrato a sido registrado con exito" });
};

const updateEstadoContrato = async (req, res) => {
  const id = req.params.id;

  const existeEstadoContrato = await Estado_Equipo.findByPk(id);
  if (!existeEstadoContrato) {
    return res.status(404).json({ ok: true, msg: "No existe el estado contrato" });
  }

  const { numeroContrato,  fechaInicio,fechaFin ,fechaTransferencia} = req.body;

  await Estado_Equipo.update(
    {
      numeroContrato,  fechaInicio,fechaFin ,fechaTransferencia
    
    },
    { where: { id: id } },
  );
  res.status(200).json({
    ok: true,
    msg: `Se actualizo con exito  el estado contrato`,
    //Permiso: PermisoUpdate,
  });
};

const deleteEstadoContrato = async (req, res) => {
  const id = req.params.id;
  const estadoContrato = await Estado_Equipo.findByPk(id);

  await estadoContrato.update({ estado: false });
  res.status(200).json({
    msg: "El estado contrato a sido desactivado con exito...",
  });
};

module.exports = {
  createEstadoContrato,
  getEstadoContrato,
  getIdEstadoContrato,
  updateEstadoContrato,
  deleteEstadoContrato,
};
