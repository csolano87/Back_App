const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../db/connection");

class UbicacionTecnico extends Model {}
UbicacionTecnico.init(
  {
    latitud: DataTypes.STRING,
    longitud: DataTypes.DATE,
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },

  {
    sequelize,
    modelName: "ubicacionTecnicos",
    timestamps: false,
  }
);

module.exports = UbicacionTecnico;
