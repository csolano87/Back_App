const Menu = require("../../models/security/menus");



const getMenus = async (req, res) => {
  const menus = await Menu.findAll();

  res.status(200).json({ ok: true, menus });
};

const getIdMenus = async (req, res) => {
  const { id } = req.params;
  const existeMenu = await Menu.findByPk(id);
  if (!existeMenu) {
    return res.status(400).json({ msg: "El menu no  existe en la BD" });
  }

  res.status(200).json({ ok: true, menus: existeMenu });
};

const createMenus = async (req, res) => {
  const { nombre, ruta, icono, orden, menuPadreId } = req.body;

  const menus = new Menu({ nombre, ruta, icono, orden, menuPadreId });
  const menu = await Menu.findOne({
    where: {
      nombre: menus.nombre,
    },
  });

  if (menu) {
    return res.status(400).json({
      msg: "El menu ya existe",
    });
  }

  await menus.save();
  res.status(201).json({ msg: "El menu a sido registrado con exito" });
};

const updateMenus = async (req, res) => {
  const id = req.params.id;

  const existeMenu = await Menu.findByPk(id);
  if (!existeMenu) {
    return res.status(404).json({ ok: true, msg: "No existe el menu" });
  }

  const { nombre, ruta, icono, orden, menuPadreId } = req.body;

  const menuUpdate = await Menu.update(
    {
      nombre,
      ruta,
      icono,
      orden,
      menuPadreId,
    },
    { where: { id: id } },
  );
  res
    .status(200)
    .json({
      ok: true,
      msg: `Se actualizo con exito  el menu`,
    //  menu: menuUpdate,
    });
};

const deleteMenus = async (req, res) => {
  const id = req.params.id;
  const menu = await Menu.findByPk(id);

  await menu.update({ estado: false });
  res.status(200).json({
    msg: "El menu a sido desactivado con exito...",
  });
};

module.exports = {
getMenus,
getIdMenus,
createMenus,
updateMenus,
deleteMenus
};
