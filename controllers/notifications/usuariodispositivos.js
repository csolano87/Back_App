const UsuarioDispositivo = require("../../models/notifications/usuariodispositivos");

const getUsuarioDispositivo = async (req, res) => {
  const usuarioDispositivo = await UsuarioDispositivo.findAll();

  res.status(200).json({ ok: true, usuarioDispositivo });
};

const getIdUsuarioDispositivo = async (req, res) => {
  const { id } = req.params;
  const existeUsuarioDispositivo = await UsuarioDispositivo.findByPk(id);
  if (!existeUsuarioDispositivo) {
    return res.status(400).json({ msg: "La UsuarioDispositivo no  existe en la BD" });
  }

  res.status(200).json({ ok: true, usuarioDispositivo: existeUsuarioDispositivo });
};

const createUsuarioDispositivo = async (req, res) => {
  const { usuarioId, tokenPush, proveedorPush, plataforma, identificadorInstalacion, ultimaConexion } = req.body;

  const usuarioDispositivos = new UsuarioDispositivo({
    usuarioId,
    tokenPush,
    proveedorPush,
    plataforma,
    identificadorInstalacion,
    ultimaConexion,
  });
  /*  const UsuarioDispositivo = await UsuarioDispositivo.findOne({
    where: {
      nombre: UsuarioDispositivos.ruc,
    },
  });

  if (UsuarioDispositivo) {
    return res.status(400).json({
      msg: "La UsuarioDispositivo  ya existe",
    });
  } */

  await usuarioDispositivos.save();
  res.status(201).json({ msg: "El usuario dispositivo a sido registrado con exito" });
};

const updateUsuarioDispositivo = async (req, res) => {
  const id = req.params.id;

  const existeUsuarioDispositivo = await UsuarioDispositivo.findByPk(id);
  if (!existeUsuarioDispositivo) {
    return res.status(404).json({ ok: true, msg: "No existe el usuario dispositivo" });
  }

  const { usuarioId, tokenPush, proveedorPush, plataforma, identificadorInstalacion, ultimaConexion } = req.body;

  await UsuarioDispositivo.update(
    {
      usuarioId,
      tokenPush,
      proveedorPush,
      plataforma,
      identificadorInstalacion,
      ultimaConexion,
    },
    { where: { id: id } },
  );
  res.status(200).json({
    ok: true,
    msg: `Se actualizo con exito  el usuario dispositivo`,
    //Permiso: PermisoUpdate,
  });
};

const deleteUsuarioDispositivo = async (req, res) => {
  const id = req.params.id;
  const usuarioDispositivo = await UsuarioDispositivo.findByPk(id);

  await usuarioDispositivo.update({ estado: false });
  res.status(200).json({
    msg: "La usuario dispositivo  a sido desactivado con exito...",
  });
};

module.exports = {
  createUsuarioDispositivo,
  getUsuarioDispositivo,
  getIdUsuarioDispositivo,
  updateUsuarioDispositivo,
  deleteUsuarioDispositivo,
};
