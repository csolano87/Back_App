const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../../db/connection");

class TipoSoporte extends Model {}
TipoSoporte.init(
  {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    requiereProgramacion: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },

  {
    sequelize,
    modelName: "tipoSoportes",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = TipoSoporte;
