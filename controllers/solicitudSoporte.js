const SolicitudSoporte = require("../models/solicitudSoporte");



const getAll = async (req, res) => {
  const solicitudSoportes = await SolicitudSoporte.findAll({});
  res.status(200).json({ ok: true, solicitudSoportes });
};

const GetById = async (req, res) => {
  const { id } = req.params;
  const solicitudSoporte = await SolicitudSoporte.findByPk(id);

  if (!solicitudSoporte) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }

  res.status(200).json({ ok: true, solicitudSoporte });
};

const post = async (req, res) => {
  const { descripcion, tiempoAtencion, tiempoEspera} = req.body;

  const solicitudSoportes = new solicitudSoporte({ 
	descripcion, tiempoAtencion, tiempoEspera });
 /*  const solicitudSoporte = await SolicitudSoporte.findOne({
    where: {
      correo: solicitudSoportes.correo,
    },
  });

  if (solicitudSoporte) {
    return res.status(400).json({
      msg: `El correo ${correo} ya se encuentra registrado`,
    });
  } */

  await solicitudSoportes.save();
  res.status(201).json({ msg: "El solicitudSoporte a sido registrado con exito.." });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { descripcion, tiempoAtencion, tiempoEspera} = req.body;
  const solicitudSoporte = await SolicitudSoporte.findByPk(id);

  if (!solicitudSoporte) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await SolicitudSoporte.update(
    {
		descripcion, tiempoAtencion, tiempoEspera
    },
    { where: { id: id } }
  );
  res.status(200).json("El solicitudSoporte a sido guardada con exito..");
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const solicitudSoporte = await SolicitudSoporte.findByPk(id);

  if (!solicitudSoporte) {
    res
      .status(400)
      .json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await SolicitudSoporte.update({ estado: 0 });

  res.status(200).json({
    msg: "El solicitudSoporte a sido desactivado con exito...",
  });
};

module.exports = { getAll, GetById, post, update, deleteById };
