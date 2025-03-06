const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../db/connection");

class TipoSoporte extends Model {}
TipoSoporte.init(
  {
    nombre: DataTypes.STRING,

    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },

  {
    sequelize,
    modelName: "tipoSoportes",
    timestamps: false,
  }
);

module.exports = TipoSoporte;
