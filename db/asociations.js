const Usuario = require("../models/security/usuarios");

const Rol = require("../models/security/role");
const Permiso = require("../models/security/permisos");
const Menu = require("../models/security/menus");
const Empresa = require("../models/inventory/empresas");
const Equipo = require("../models/inventory/equipos");
const Marca = require("../models/inventory/marcas");
const Area_Equipo = require("../models/inventory/areas_equipos");
const Tipo_Adquisicion = require("../models/inventory/tipo_adquision");
const Estado_Equipo = require("../models/inventory/estado_equipo");
const Equipo_Contrato = require("../models/inventory/equipos_contratos");
const Equipo_Movimiento = require("../models/inventory/equipo_movimiento");
const Tipo_Movimiento = require("../models/inventory/tipos_movimiento");

Usuario.belongsTo(Rol, { as: "rol", foreignKey: "rolId" });
Rol.hasMany(Usuario, { as: "usuarios", foreignKey: "rolId" });

Usuario.belongsTo(Empresa,{as:"empresas", foreignKey:"empresaId"});
Empresa.hasMany(Usuario,{as:"usuarios",foreignKey:"empresaId"});


Empresa.hasMany(Equipo,{as:"equipos",foreignKey:"empresaId"});
Equipo.belongsTo(Empresa,{as:"empresas", foreignKey:"empresaId"});

Marca.hasMany(Equipo,{as:"equipos", foreignKey:"marcaId"});
Equipo.belongsTo(Marca,{as:"marcas",foreignKey:"marcaId"});


Equipo.belongsTo(Area_Equipo,{as:"areas",foreignKey:"areaId"});
Area_Equipo.hasMany(Equipo,{as:"equipos", foreignKey:"areaId"});

Equipo.belongsTo(Tipo_Adquisicion,{as:"tipos",foreignKey:"tipoId"});
Tipo_Adquisicion.hasMany(Equipo,{as:"equipos", foreignKey:"tipoId"});


Estado_Equipo.hasMany(Equipo,{as:"equipos", foreignKey:"estadoEquipoId"});
Equipo.belongsTo(Estado_Equipo,{as:"estadoEquipo",foreignKey:"estadoEquipoId"});

Equipo.hasMany(Equipo_Contrato,{as:"contratos",foreignKey:"equipoId"});
Equipo_Contrato.belongsTo(Equipo,{as:"equipos", foreignKey:"equipoId"});



Equipo.hasMany(Equipo_Movimiento,{as:"movimientoEquipo",foreignKey:"equipoId"});
Equipo_Movimiento.belongsTo(Equipo,{as:"equipos", foreignKey:"equipoId"});

Tipo_Movimiento.hasMany(Equipo_Movimiento,{as:"movimientoEquipo",foreignKey:"tipoMovimientoId"});
Equipo_Movimiento.belongsTo(Tipo_Movimiento,{as:"tipoMovimiento", foreignKey:"tipoMovimientoId"});

Usuario.hasMany(Equipo_Movimiento,{as:"movimientoEquipo",foreignKey:"usuarioId"});
Equipo_Movimiento.belongsTo(Usuario,{as:"usuarios", foreignKey:"usuarioId"});








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
