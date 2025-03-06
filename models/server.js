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

      auth: "/api/auth",
      CategoriaTecnico: "/api/CategoriaTecnico",
      clientes: "/api/clientes",
      equipos: "/api/equipos",      
      roles: "/api/roles",
      SolicitudSoporte: "/api/SolicitudSoporte",
      tecnicos: "/api/tecnicos",
      TipoSoporte: "/api/tipoSoporte",
      TipoTicket: "/api/TipoTicket",
      usuarios: "/api/usuarios",
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
      })
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
      db.sync({ force: false }).then(() => {
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

    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.CategoriaTecnico, require("../routes/categoriaTecnico"));
    this.app.use(this.paths.clientes, require("../routes/cliente"));
    this.app.use(this.paths.equipos, require("../routes/equipos"));
    this.app.use(this.paths.roles, require("../routes/roles"));
    this.app.use(this.paths.SolicitudSoporte, require("../routes/solicitudSoporte"));
    this.app.use(this.paths.tecnicos, require("../routes/tecnicos"));
    this.app.use(this.paths.TipoSoporte, require("../routes/tipoSoporte"));
    this.app.use(this.paths.TipoTicket, require("../routes/tiposTicket"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));


  }

  listen() {
    this.httpServer.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
