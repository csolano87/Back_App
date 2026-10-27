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
const UsuarioArea = require("../models/support/usuarioArea");
const AreaSoporte = require("../models/support/areaSoporte");
const CasoSoporte = require("../models/support/casoSoporte");
const TipoCaso = require("../models/support/tipoCaso");
const EstadoCaso = require("../models/support/estadoCasos");
const CasoAsignacion = require("../models/support/casoSoporteAsignacion");
const TareaSoporte = require("../models/support/tareaSoporte");
const TipoSoporte = require("../models/support/tipoCasoSoporte");
const ModalidadAtencion = require("../models/support/modalidadCasoAtencion");
const EstadoTarea = require("../models/support/estadostarea");
const TareaDependencia = require("../models/support/tareaDependientes");
const TareaProgramada = require("../models/support/tareaProgramadas");
const TareaAsignada = require("../models/support/tareaAsignada");
const TareaIntervencion = require("../models/support/tareaIntervencion");
const CanalAtencion = require("../models/support/canalesAtencion");
const CasoSeguimiento = require("../models/support/casoSeguimiento");
const CasoAdjunto = require("../models/support/casoAdjunto");
/* Security */
Usuario.belongsTo(Rol, { as: "rol", foreignKey: "rolId" });
Rol.hasMany(Usuario, { as: "usuarios", foreignKey: "rolId" });
Rol.belongsToMany(Permiso, { as: "permiso", through: "rol_permisos", foreignKey: "rolId", otherKey: "permisoId" });

Permiso.belongsToMany(Rol, { as: "rol", through: "rol_permisos", foreignKey: "permisoId", otherKey: "rolId" });

Permiso.belongsTo(Menu, { as: "menu", foreignKey: "menuId" });
Menu.hasMany(Permiso, { as: "permiso", foreignKey: "menuId" });
Menu.hasMany(Menu, { as: "submenus", foreignKey: "menuPadreId" });

Menu.belongsTo(Menu, { as: "padre", foreignKey: "menuPadreId" });

/* inventory */
Usuario.belongsTo(Empresa, { as: "empresas", foreignKey: "empresaId" });
Empresa.hasMany(Usuario, { as: "usuarios", foreignKey: "empresaId" });

Empresa.hasMany(Equipo, { as: "equipos", foreignKey: "empresaId" });
Equipo.belongsTo(Empresa, { as: "empresas", foreignKey: "empresaId" });

Marca.hasMany(Equipo, { as: "equipos", foreignKey: "marcaId" });
Equipo.belongsTo(Marca, { as: "marcas", foreignKey: "marcaId" });

Equipo.belongsTo(Area_Equipo, { as: "areas", foreignKey: "areaId" });
Area_Equipo.hasMany(Equipo, { as: "equipos", foreignKey: "areaId" });

Equipo.belongsTo(Tipo_Adquisicion, { as: "tipos", foreignKey: "tipoId" });
Tipo_Adquisicion.hasMany(Equipo, { as: "equipos", foreignKey: "tipoId" });

Estado_Equipo.hasMany(Equipo, { as: "equipos", foreignKey: "estadoEquipoId" });
Equipo.belongsTo(Estado_Equipo, { as: "estadoEquipo", foreignKey: "estadoEquipoId" });

Equipo.hasMany(Equipo_Contrato, { as: "contratos", foreignKey: "equipoId" });
Equipo_Contrato.belongsTo(Equipo, { as: "equipos", foreignKey: "equipoId" });

Equipo.hasMany(Equipo_Movimiento, { as: "movimientoEquipo", foreignKey: "equipoId" });
Equipo_Movimiento.belongsTo(Equipo, { as: "equipos", foreignKey: "equipoId" });

Tipo_Movimiento.hasMany(Equipo_Movimiento, { as: "movimientoEquipo", foreignKey: "tipoMovimientoId" });
Equipo_Movimiento.belongsTo(Tipo_Movimiento, { as: "tipoMovimiento", foreignKey: "tipoMovimientoId" });

Usuario.hasMany(Equipo_Movimiento, { as: "movimientoEquipo", foreignKey: "usuarioId" });
Equipo_Movimiento.belongsTo(Usuario, { as: "usuarios", foreignKey: "usuarioId" });

/* Support */

/* ==========================================
   SUPPORT - USUARIOS Y ÁREAS
========================================== */
Usuario.hasMany(UsuarioArea, { as: "usuarioAreas", foreignKey: "usuarioId" });
UsuarioArea.belongsTo(Usuario, { as: "usuario", foreignKey: "usuarioId" });

AreaSoporte.hasMany(UsuarioArea, { as: "usuarioAreas", foreignKey: "areaSoporteId" });
UsuarioArea.belongsTo(AreaSoporte, { as: "areaSoporte", foreignKey: "areaSoporteId" });

/* ==========================================
   SUPPORT - CASOS
========================================== */
Empresa.hasMany(CasoSoporte, { as: "casoSoportes", foreignKey: "empresaId" });
CasoSoporte.belongsTo(Empresa, { as: "empresas", foreignKey: "empresaId" });

Equipo.hasMany(CasoSoporte, { as: "casoSoporte", foreignKey: "equipoId" });
CasoSoporte.belongsTo(Empresa, { as: "equipos", foreignKey: "equipoId" });

Usuario.hasMany(CasoSoporte, { as: "casosSolicitados", foreignKey: "usuarioSolicitanteId" });
CasoSoporte.belongsTo(Usuario, { as: "solicitante", foreignKey: "usuarioSolicitanteId" });
/*  */
TipoCaso.hasMany(CasoSoporte, { as: "casosSoporte", foreignKey: "tipoCasoId" });
CasoSoporte.belongsTo(TipoCaso, { as: "tipoCaso", foreignKey: "tipoCasoId" });

Usuario.hasMany(CasoSoporte, { as: "casosResponsables", foreignKey: "responsableActualId" });
CasoSoporte.belongsTo(Usuario, { as: "responsable", foreignKey: "responsableActualId" });

EstadoCaso.hasMany(CasoSoporte, { as: "casoSoporte", foreignKey: "estadoCasoId" });
CasoSoporte.belongsTo(EstadoCaso, { as: "estadoCaso", foreignKey: "estadoCasoId" });

Usuario.hasMany(CasoSoporte, { as: "casosCerrados", foreignKey: "usuarioCierreId" });
CasoSoporte.belongsTo(Usuario, { as: "usuarioCierre", foreignKey: "usuarioCierreId" });
/* ==========================================
   SUPPORT - ASIGNACIONES DE CASOS
========================================== */
CasoSoporte.hasMany(CasoAsignacion, {
  as: "asignaciones",
  foreignKey: "casoId",
});

CasoAsignacion.belongsTo(CasoSoporte, {
  as: "caso",
  foreignKey: "casoId",
});
Usuario.hasMany(CasoAsignacion, { as: "casoAsignacionesOrigen", foreignKey: "usuarioOrigenId" });
CasoAsignacion.belongsTo(Usuario, { as: "usuarioOrigen", foreignKey: "usuarioOrigenId" });

Usuario.hasMany(CasoAsignacion, { as: "casoAsignacionesDestino", foreignKey: "usuarioDestinoId" });
CasoAsignacion.belongsTo(Usuario, { as: "usuarioDestino", foreignKey: "usuarioDestinoId" });

Usuario.hasMany(CasoAsignacion, { as: "casoAsignacionesRealizadas", foreignKey: "usuarioAsignadorId" });
CasoAsignacion.belongsTo(Usuario, { as: "usuarioAsignador", foreignKey: "usuarioAsignadorId" });
/* ==========================================
   SUPPORT - TAREAS
========================================== */
CasoSoporte.hasMany(TareaSoporte, { as: "tareas", foreignKey: "casoId" });
TareaSoporte.belongsTo(CasoSoporte, { as: "caso", foreignKey: "casoId" });

AreaSoporte.hasMany(TareaSoporte, { as: "tareas", foreignKey: "areaSoporteId" });
TareaSoporte.belongsTo(AreaSoporte, { as: "areaSoporte", foreignKey: "areaSoporteId" });

Usuario.hasMany(TareaSoporte, { as: "tareasAsignadas", foreignKey: "tecnicoId" });
TareaSoporte.belongsTo(Usuario, { as: "tecnico", foreignKey: "tecnicoId" });

TipoSoporte.hasMany(TareaSoporte, { as: "tareas", foreignKey: "tipoSoporteId" });
TareaSoporte.belongsTo(TipoSoporte, { as: "tipoSoporte", foreignKey: "tipoSoporteId" });

ModalidadAtencion.hasMany(TareaSoporte, { as: "tareas", foreignKey: "modalidadId" });
TareaSoporte.belongsTo(ModalidadAtencion, { as: "modalidad", foreignKey: "modalidadId" });

EstadoTarea.hasMany(TareaSoporte, { as: "tareas", foreignKey: "estadoTareaId" });
TareaSoporte.belongsTo(EstadoTarea, { as: "estadoTarea", foreignKey: "estadoTareaId" });

Usuario.hasMany(TareaSoporte, { as: "tareasCerradas", foreignKey: "usuarioCierreId" });
TareaSoporte.belongsTo(Usuario, { as: "usuarioCierre", foreignKey: "usuarioCierreId" });
/* ==========================================
   SUPPORT - DEPENDENCIAS DE TAREAS
========================================== */
TareaSoporte.hasMany(TareaDependencia, { as: "dependencias", foreignKey: "tareaId" });
TareaDependencia.belongsTo(TareaSoporte, { as: "tarea", foreignKey: "tareaId" });

TareaSoporte.hasMany(TareaDependencia, { as: "dependenciasDeOtrasTareas", foreignKey: "dependeDeTareaId" });
TareaDependencia.belongsTo(TareaSoporte, { as: "tareaPrevia", foreignKey: "dependeDeTareaId" });
/* ==========================================
   SUPPORT - PROGRAMACIONES
========================================== */
TareaSoporte.hasMany(TareaProgramada, { as: "programaciones", foreignKey: "tareaId" });
TareaProgramada.belongsTo(TareaSoporte, { as: "tarea", foreignKey: "tareaId" });

Usuario.hasMany(TareaProgramada, { as: "programacionesRealizadas", foreignKey: "usuarioProgramadorId" });
TareaProgramada.belongsTo(Usuario, { as: "programador", foreignKey: "usuarioProgramadorId" });

/* ==========================================
   SUPPORT - ASIGNACIONES DE TAREAS
========================================== */

TareaSoporte.hasMany(TareaAsignada, { as: "asignaciones", foreignKey: "tareaId" });
TareaAsignada.belongsTo(TareaSoporte, { as: "tarea", foreignKey: "tareaId" });

Usuario.hasMany(TareaAsignada, { as: "tareaAsignacionesOrigen", foreignKey: "tecnicoOrigenId" });
TareaAsignada.belongsTo(Usuario, { as: "tecnicoOrigen", foreignKey: "tecnicoOrigenId" });

Usuario.hasMany(TareaAsignada, { as: "tareaAsignacionesDestino", foreignKey: "tecnicoDestinoId" });
TareaAsignada.belongsTo(Usuario, { as: "tecnicoDestino", foreignKey: "tecnicoDestinoId" });

Usuario.hasMany(TareaAsignada, { as: "tareaAsignacionesRealizadas", foreignKey: "usuarioAsignadorId" });
TareaAsignada.belongsTo(Usuario, { as: "usuarioAsignador", foreignKey: "usuarioAsignadorId" });

/* ==========================================
   SUPPORT - INTERVENCIONES
========================================== */
TareaSoporte.hasMany(TareaIntervencion, { as: "intervenciones", foreignKey: "tareaId" });
TareaIntervencion.belongsTo(TareaSoporte, { as: "tarea", foreignKey: "tareaId" });

Usuario.hasMany(TareaIntervencion, { as: "intervencionesRealizadas", foreignKey: "tecnicoId" });
TareaIntervencion.belongsTo(Usuario, { as: "tecnico", foreignKey: "tecnicoId" });

ModalidadAtencion.hasMany(TareaIntervencion, { as: "intervenciones", foreignKey: "modalidadId" });
TareaIntervencion.belongsTo(ModalidadAtencion, { as: "modalidad", foreignKey: "modalidadId" });

CanalAtencion.hasMany(TareaIntervencion, { as: "intervenciones", foreignKey: "canalId" });
TareaIntervencion.belongsTo(CanalAtencion, { as: "canal", foreignKey: "canalId" });
/* ==========================================
   SUPPORT - SEGUIMIENTOS
========================================== */

CasoSoporte.hasMany(CasoSeguimiento, { as: "seguimientos", foreignKey: "casoId" });
CasoSeguimiento.belongsTo(CasoSoporte, { as: "caso", foreignKey: "casoId" });
Usuario.hasMany(CasoSeguimiento, { as: "seguimientosRealizados", foreignKey: "usuarioId" });
CasoSeguimiento.belongsTo(Usuario, { as: "usuarios", foreignKey: "usuarioId" });
/* ==========================================
   SUPPORT - ADJUNTOS
========================================== */
CasoSoporte.hasMany(CasoAdjunto, { as: "adjuntos", foreignKey: "casoId" });
CasoAdjunto.belongsTo(CasoSoporte, { as: "caso", foreignKey: "casoId" });

Usuario.hasMany(CasoAdjunto, { as: "adjuntosSubidos", foreignKey: "usuarioId" });
CasoAdjunto.belongsTo(Usuario, { as: "usuarios", foreignKey: "usuarioId" });
/* Notifications */
