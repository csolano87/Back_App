const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../../db/connection");
//const Cabecera = require('./cabecera');

class Rol_Permiso extends Model {}
Rol_Permiso.init(
  {
   
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    // freezeTableName: true,
    tableName: "rol_permisos",
    timestamps: true,
    paranoid: false,
  },
);
module.exports = Rol_Permiso;
