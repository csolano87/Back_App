const Equipo = require("../../models/inventory/equipos");


const getEquipos = async (req, res) => {
  const equipos = await Equipo.findAll({});
  res.status(200).json({ ok: true, equipos });
};

const getByIdEquipos = async (req, res) => {
  const { id } = req.params;
  const equipo = await Equipo.findByPk(id);

  if (!equipo) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }

  res.status(200).json({ ok: true, equipo
   });
};

const createEquipos = async (req, res) => {
  const { nombre, modelo,serie, descripcion } = req.body;

  const equipos = new Equipo({ nombre, serie, descripcion
    ,fechaElaboracion,fechaInstalacion
    ,fechaInicioUso,fechaBaja,motivoBaja
   });
  const equipo = await Equipo.findOne({
    where: {
      serie: equipos.serie,
    },
  });

  if (equipo) {
    return res.status(400).json({
      msg: `La serie ${serie} ya se encuentra registrado`,
    });
  }

  await equipos.save();
  res.status(201).json({ msg: "El equipo a sido registrado con exito.." });
};

const updateEquipos = async (req, res) => {
  const { id } = req.params;
  const { nombre, serie, descripcion
    ,fechaElaboracion,fechaInstalacion
    ,fechaInicioUso,fechaBaja,motivoBaja} = req.body;
  const equipo = await Equipo.findByPk(id);

  if (!equipo) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await Equipo.update(
    {
      nombre, serie, descripcion
    ,fechaElaboracion,fechaInstalacion
    ,fechaInicioUso,fechaBaja,motivoBaja
    },
    { where: { id: id } }
  );
  res.status(200).json("El equipo a sido guardada con exito..");
};

const deleteEquipos = async (req, res) => {
  const { id } = req.params;
  const equipo = await Equipo.findByPk(id);

  if (!equipo) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await equipo.update({ estado: 0 });

  res.status(200).json({
    msg: "El cliente a sido desactivado con exito...",
  });
};

module.exports = { getEquipos,getByIdEquipos,createEquipos,updateEquipos,deleteEquipos };
