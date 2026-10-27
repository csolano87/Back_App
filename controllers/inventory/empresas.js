const Empresa = require("../../models/inventory/empresas");



const getEmpresa = async (req, res) => {
  const empresa = await Empresa.findAll();

  res.status(200).json({ ok: true, empresa });
};

const getIdEmpresa = async (req, res) => {
  const { id } = req.params;
  const existeEmpresa = await Empresa.findByPk(id);
  if (!existeEmpresa) {
    return res.status(400).json({ msg: "La empresa no  existe en la BD" });
  }

  res.status(200).json({ ok: true, empresa: existeEmpresa });
};

const createEmpresa = async (req, res) => {
  const {  razonSocial, ruc, direccion, telefono,correo} = req.body;

  const empresas = new Empresa({  razonSocial, ruc, direccion, telefono,correo });
  const empresa = await Permiso.findOne({
    where: {
      nombre: empresas.ruc,
    },
  });

  if (empresa) {
    return res.status(400).json({
      msg: "La empresa  ya existe",
    });
  }

  await empresas.save();
  res.status(201).json({ msg: "La empresa a sido registrado con exito" });
};

const updateEmpresa = async (req, res) => {
  const id = req.params.id;

  const existeEmpresa = await Empresa.findByPk(id);
  if (!existeEmpresa) {
    return res.status(404).json({ ok: true, msg: "No existe la empresa" });
  }

  const { razonSocial, ruc, direccion, telefono,correo } = req.body;

   await Empresa.update(
    {
       razonSocial, ruc, direccion, telefono,correo
    },
    { where: { id: id } },
  );
  res.status(200).json({
    ok: true,
    msg: `Se actualizo con exito  la empresa`,
    //Permiso: PermisoUpdate,
  });
};

const deleteEmpresa = async (req, res) => {
  const id = req.params.id;
  const empresa = await Empresa.findByPk(id);

  await empresa.update({ estado: false });
  res.status(200).json({
    msg: "La empresa  a sido desactivado con exito...",
  });
};

module.exports = {
  createEmpresa,
  getEmpresa,
  getIdEmpresa,
  updateEmpresa,
  deleteEmpresa,
};
