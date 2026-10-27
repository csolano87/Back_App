const Tipo_Movimiento = require("../../models/inventory/tipos_movimiento");



const getTipoMovimiento = async (req, res) => {
  const tipoMovimiento = await Tipo_Movimiento.findAll();

  res.status(200).json({ ok: true,  tipoMovimiento: tipoMovimiento });
};

const getIdTipoMovimiento = async (req, res) => {
  const { id } = req.params;
  const tipoMovimiento = await Tipo_Movimiento.findByPk(id);
  if (!tipoMovimiento) {
    return res.status(400).json({ msg: "El tipo de movimiento no  existe en la BD" });
  }

  res.status(200).json({ ok: true, tipoMovimiento: tipoMovimiento });
};

const createTipoMovimiento = async (req, res) => {
  const { nombre } = req.body;

  const tipoMovimiento = new Tipo_Movimiento({ nombre, codigo, descripcion, menuId });
  const tipomovimiento = await Tipo_Movimiento.findOne({
    where: {
      nombre: tipoMovimiento.nombre,
    },
  });

  if (tipomovimiento) {
    return res.status(400).json({
      msg: "El tipo de movimiento ya existe",
    });
  }

  await permisos.save();
  res.status(201).json({ msg: "El tipo de movimiento a sido registrado con exito" });
};

const updateTipoMovimiento = async (req, res) => {
  const id = req.params.id;

  const existeTipoMovimiento = await Tipo_Movimiento.findByPk(id);
  if (!existeTipoMovimiento) {
    return res.status(404).json({ ok: true, msg: "No existe el tipo de movimiento" });
  }

  const { nombre,  } = req.body;

   await Tipo_Movimiento.update(
    {
      nombre,
      
    },
    { where: { id: id } },
  );
  res.status(200).json({
    ok: true,
    msg: `Se actualizo con exito  el tipo de movimiento`,
    //Permiso: PermisoUpdate,
  });
};

const deleteTipoMovimiento = async (req, res) => {
  const id = req.params.id;
  const tipoMovimiento = await Tipo_Movimiento.findByPk(id);

  await tipoMovimiento.update({ estado: false });
  res.status(200).json({
    msg: "El tipo de movimiento a sido desactivado con exito...",
  });
};

module.exports = {
  createTipoMovimiento,
  getTipoMovimiento,
  getIdTipoMovimiento,
  updateTipoMovimiento,
  deleteTipoMovimiento,
};
