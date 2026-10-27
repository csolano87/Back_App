const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const db = require("../db/connection");
const Sequelize = require("sequelize");
var xmlparser = require("express-xml-bodyparser");
const socketIO = require("socket.io");
const http = require("http");
const { desconectar, mensaje } = require("../sockets/sockets");
const path = require("path");
const { truncate } = require("fs");
const { findLastIndex } = require("lodash");

require("../db/asociations");

//const store=new session.MemoryStore;
class Server {
  static instance;
  constructor() {
    if (Server.instance) {
      return Server.instance;
    }

    Server.instance = this;
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      /* Security */
      auth: "/api/auth",
      usuarios: "/api/usuarios",
      roles: "/api/roles",
      menus: "/api/menus",
      permisos: "/api/permisos",

      /* Inventory */
      areas: "/api/areas_equipos",
      empresas: "/api/empresas",
      movimientoEquipos: "/api/movimiento_equipo",
      contrato: "/api/contrato_equipo",
      equipos: "/api/equipos",
      estadoEquipos: "/api/estado_equipos",
      marcas: "/api/marcas_equipos",
      tipoAquisicion: "/api/tipo_aquisicion",
      tipomovimientos: "/api/tipo_movimiento",
/* support */
      /* SolicitudSoporte: "/api/SolicitudSoporte",
      tecnicos: "/api/tecnicos",
      TipoSoporte: "/api/tipoSoporte",
      TipoTicket: "/api/TipoTicket",
      CategoriaTecnico: "/api/CategoriaTecnico",
      clientes: "/api/clientes",
      equipos: "/api/equipos",  */
    };
    // Conectar a base de datos
    this.dbConnection();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new Server();
    }
    return this.instance;
  }

  middlewares() {
    this.app.use(
      cors({
        origin: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      }),
    );
    this.app.use(cookieParser());

    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(xmlparser());

    this.app.use(express.static("public"));
    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer, {
      cors: {
        origin: "http://localhost:4200", // Cambia esto a la URL de tu cliente Angular
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      },
    });
    //  this.httpServer = http.createServer(this.app);
    this.escucharSockets();
  }
  async dbConnection() {
    try {
      await db.authenticate();
      db.sync({ alter: false }).then(() => {
        console.log("Database online");
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  escucharSockets() {
    console.log("Escuchando conexiones");

    this.io.on("connection", (cliente) => {
      console.log("Cliente conectado");

      desconectar(cliente);
    });
  }
  routes() {
    /* Security  */
    this.app.use(this.paths.auth, require("../routes/security/auth"));
    this.app.use(this.paths.usuarios, require("../routes/security/usuarios"));
    this.app.use(this.paths.roles, require("../routes/security/roles"));
    this.app.use(this.paths.menus, require("../routes/security/menus"));
    this.app.use(this.paths.permisos, require("../routes/security/permisos"));

    /* Inventory */
    this.app.use(this.paths.areas, require("../routes/inventory/areas_equipos"));
    this.app.use(this.paths.empresas, require("../routes/inventory/empresas"));
    this.app.use(this.paths.movimientoEquipos, require("../routes/inventory/equipo_movimiento"));
    this.app.use(this.paths.contrato, require("../routes/inventory/equipos_contratos"));
    this.app.use(this.paths.equipos, require("../routes/inventory/equipos"));
    this.app.use(this.paths.estadoEquipos, require("../routes/inventory/estado_equipo"));
    this.app.use(this.paths.marcas, require("../routes/inventory/marcas"));
    this.app.use(this.paths.tipoAquisicion, require("../routes/inventory/tipo_adquision"));
    this.app.use(this.paths.tipomovimientos, require("../routes/inventory/tipos_movimiento"));
/* support */
   /*  this.app.use(this.paths.CategoriaTecnico, require("../routes/categoriaTecnico"));
    this.app.use(this.paths.clientes, require("../routes/cliente"));

    this.app.use(this.paths.SolicitudSoporte, require("../routes/solicitudSoporte"));
    this.app.use(this.paths.tecnicos, require("../routes/tecnicos"));
    this.app.use(this.paths.TipoSoporte, require("../routes/tipoSoporte"));
    this.app.use(this.paths.TipoTicket, require("../routes/tiposTicket"));  */
  }

  listen() {
    this.httpServer.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
