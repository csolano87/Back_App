const ModalidadAtencion = require("../../models/support/modalidadCasoAtencion");

const getModalidadAtencion = async (req, res) => {
  const modalidadAtencion = await ModalidadAtencion.findAll();

  res.status(200).json({ ok: true, modalidadAtencion });
};

const getByIdModalidadAtencion = async (req, res) => {
  const { id } = req.params;
  const modalidadAtencion = await ModalidadAtencion.findByPk(id);

  if (!modalidadAtencion) {
    return res.status(400).json({ msg: "La modalidad de atencion del caso no existe en el BD" });
  }

  res.status(200).json({ ok: true, modalidadAtencion });
};

const createModalidadAtencion = async (req, res) => {
  const { codigo, nombre } = req.body;

  const modalidadAtencion = new ModalidadAtencion({
    codigo,
    nombre,
  });
  const modalidadatencion = await ModalidadAtencion.findOne({
    where: {
      codigo: modalidadAtencion.codigo,
      //  usuarioDestinoId: modalidadAtencion.usuarioDestinoId,
    },
  });

  if (modalidadatencion) {
    return res.status(400).json({
      msg: "Existe una modalidad de atenvion  ",
    });
  }

  await modalidadAtencion.save();
  res.status(201).json({ msg: "Se registro la modalidad de atencion el caso  con exito" });
};

const updateModalidadAtencion = async (req, res) => {
  const { id } = req.params;
  const { codigo, nombre } = req.body;
  const modalidadAtencion = await ModalidadAtencion.findByPk(id);
  if (!modalidadAtencion) {
    return res.status(400).json({
      msg: "El caso no existe",
    });
  }
  await modalidadAtencion.update(
    {
      codigo,
      nombre,
    },
    {
      where: { id: id },
    },
  );

  res.status(200).json({ msg: "la modalidad de atencion a sido guardado con exito" });
};

const deleteModalidadAtencion = async (req, res) => {
  const { id } = req.params;
  const modalidadAtencion = await ModalidadAtencion.findByPk(id);

  if (!modalidadAtencion) {
    res.status(400).json({ ok: false, msg: `El Id ${id} no esta registrado en el sistema` });
  }
  await modalidadAtencion.update({ estado: 0 });

  res.status(200).json({
    msg: "La modalidad de atencion  a sido desactivado con exito...",
  });
};

module.exports = {
  getModalidadAtencion,
  getByIdModalidadAtencion,
  createModalidadAtencion,
  updateModalidadAtencion,
  deleteModalidadAtencion,
};
