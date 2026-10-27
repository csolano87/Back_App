const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../../db/connection");

class CasoSoporte extends Model {}
CasoSoporte.init(
  {
    numeroCaso: DataTypes.STRING,
    asunto: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    prioridad: DataTypes.ENUM("BAJA", "MEDIA", "ALTA", "CRITICA"),
    fechaApertura: { 
      type: DataTypes.DATE },
    fechaResolucion: DataTypes.DATE,
    fechaCierre: DataTypes.DATE,

    observacionCierre: DataTypes.TEXT,

    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },

  {
    sequelize,
    modelName: "casoSoportes",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = CasoSoporte;
