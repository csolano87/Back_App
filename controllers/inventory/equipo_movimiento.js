const Equipo_Movimiento = require("../../models/inventory/equipo_movimiento");





const getEquipoMovimiento = async (req, res) => {
  const EquipoMovimiento = await Equipo_Movimiento.findAll();

  res.status(200).json({ ok: true, EquipoMovimiento });
};

const getIdEquipoMovimiento = async (req, res) => {
  const { id } = req.params;
  const existeEquipoMovimiento = await Equipo_Movimiento.findByPk(id);
  if (!existeEquipoMovimiento) {
    return res.status(400).json({ msg: "El estado contrato no  existe en la BD" });
  }

  res.status(200).json({ ok: true, EquipoMovimiento: existeEquipoMovimiento });
};

const createEquipoMovimiento = async (req, res) => {
  const { nombre,  fechaMovimiento,observacion } = req.body;

  const equipoMovimiento = new Estado_Equipo({ nombre,  fechaMovimiento,observacion});
  const equipomovimiento = await Estado_Equipo.findOne({
    where: {
      nombre: equipoMovimiento.numeroContrato,
    },
  });

  if (equipomovimiento) {
    return res.status(400).json({
      msg: "El movimiento  ya existe",
    });
  }

  await equipoMovimiento.save();
  res.status(201).json({ msg: "El movimiento a sido registrado con exito" });
};

const updateEquipoMovimiento = async (req, res) => {
  const id = req.params.id;

  const existeEquipoMovimiento = await Equipo_Movimiento.findByPk(id);
  if (!existeEquipoMovimiento) {
    return res.status(404).json({ ok: true, msg: "No existe el movimiento" });
  }

  const { nombre,  fechaMovimiento,observacion} = req.body;

  await Equipo_Movimiento.update(
    {
      nnombre,  fechaMovimiento,observacion
    
    },
    { where: { id: id } },
  );
  res.status(200).json({
    ok: true,
    msg: `Se actualizo con exito  el movimiento`,
    //Permiso: PermisoUpdate,
  });
};

const deleteEquipoMovimiento = async (req, res) => {
  const id = req.params.id;
  const EquipoMovimiento = await Equipo_Movimiento.findByPk(id);

  await EquipoMovimiento.update({ estado: false });
  res.status(200).json({
    msg: "El movimiento a sido desactivado con exito...",
  });
};

module.exports = {
  createEquipoMovimiento,
  getEquipoMovimiento,
  getIdEquipoMovimiento,
  updateEquipoMovimiento,
  deleteEquipoMovimiento,
};
