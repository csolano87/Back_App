const Usuario = require("../models/usuarios");

const Rol = require("../models/role");
const Permiso = require("../models/permisos");
const Menu = require("../models/menus");

Usuario.belongsTo(Rol, { as: "rol", foreignKey: "rolId" });
Rol.hasMany(Usuario, { as: "usuarios", foreignKey: "rolId" });

Rol.belongsToMany(Permiso, {
  as: "permiso",
  through: "rol_permisos",
  foreignKey: "rolId",
  otherKey: "permisoId",
});

Permiso.belongsToMany(Rol, {
  as: "rol",
  through: "rol_permisos",
  foreignKey: "permisoId",
  otherKey: "rolId",
});

Permiso.belongsTo(Menu, { as: "menu", foreignKey: "menuId" });
Menu.hasMany(Permiso, { as: "permiso", foreignKey: "menuId" });
Menu.hasMany(Menu, {
  as: "submenus",
  foreignKey: "menuPadreId",
});

Menu.belongsTo(Menu, {
  as: "padre",
  foreignKey: "menuPadreId",
});
