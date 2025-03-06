const Usuario = require("../models/usuarios");
const Role = require("../models/role");
const Cliente = require("../models/cliente");
const Equipo = require("../models/equipos");
const CategoriaTecnico = require("../models/categoriaTecnico");
const Tecnico = require("../models/tecnicos");
const SolicitudSoporte = require("../models/solicitudSoporte");
const TipoTicket = require("../models/tiposTicket");
const TipoSoporte = require("../models/tipoSoporte");
const Sintoma = require("../models/sintoma");
const AsignacionSoporte = require("../models/asignacionSoporte");
/* const Menu = require("../models/menu");
const MenuRole = require("../models/menuRoles"); */

Usuario.belongsTo(Role, { as: "role", foreignKey: "roleId" });
Role.belongsTo(Usuario, { as: "usuario" });
Cliente.hasMany(Equipo, { as: "equipo", foreignKey: "equipoId" });
Equipo.belongsTo(Cliente, { as: "cliente" });

/* SolicitudSoporte.hasMany(Tecnico, { as: "tecnico", foreignKey: "tecnicoId" });
Tecnico.belongsTo(SolicitudSoporte, { as: "solicitud" }); */

SolicitudSoporte.belongsTo(TipoTicket, {
  as: "tipoticket",
  foreignKey: "tipoticketId",
});
TipoTicket.belongsTo(SolicitudSoporte, { as: "solicitud" });

SolicitudSoporte.belongsTo(Sintoma, { as: "sintoma", foreignKey: "sintomaId" });
Sintoma.belongsTo(SolicitudSoporte, { as: "solicitud" });

SolicitudSoporte.belongsTo(Tecnico, { as: "tecnico", foreignKey: "tecnicoId" });
Tecnico.belongsTo(SolicitudSoporte, { as: "solicitud" });

SolicitudSoporte.belongsTo(Cliente, { as: "cliente", foreignKey: "clienteId" });
Cliente.belongsTo(SolicitudSoporte, { as: "solicitud" });

SolicitudSoporte.belongsTo(Equipo, { as: "equipo", foreignKey: "equipoId" });
Equipo.belongsTo(SolicitudSoporte, { as: "solicitud" });

SolicitudSoporte.belongsTo(AsignacionSoporte, {
  as: "asignacion",
  foreignKey: "asignacionId",
});
AsignacionSoporte.belongsTo(SolicitudSoporte, { as: "solicitud" });

Usuario.hasMany(SolicitudSoporte, {
  as: "solicitud",
  foreignKey: "solicitudId",
});
SolicitudSoporte.belongsTo(Usuario, { as: "usuario" });

SolicitudSoporte.belongsToMany(TipoSoporte, {
  through: "SolicitudTipoAtencion",
});
TipoSoporte.belongsToMany(SolicitudSoporte, {
  through: "SolicitudTipoAtencion",
});
/* CategoriaTecnico.hasMany(Tecnico,{as:'tecnico', foreignKey:'tecnicoId'})
Tecnico.belongsTo(CategoriaTecnico,{as:'categoria'}) */

/* SolicitudSoporte.hasMany(TipoTicket,{as:'tipoticket', foreignKey:'tipoticketId'})
TipoTicket.belongsTo(CategoriaTecnico,{as:'categoria'}) */

/* 
Role.belongsToMany(Menu ,{as:"menu", through: MenuRole});
Menu.belongsToMany(Role ,{as:"role", through: MenuRole}) */
