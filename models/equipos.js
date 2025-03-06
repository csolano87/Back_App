const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../db/connection");

class Equipo extends Model {}
Equipo.init(
  {
    nombre: DataTypes.STRING,
    serie: DataTypes.STRING,
    descripcion:DataTypes.STRING,
    fechaElaboracion: DataTypes.DATE,
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },

  {
    sequelize,
    modelName: "equipos",
    timestamps: false,
  }
);

module.exports = Equipo;
