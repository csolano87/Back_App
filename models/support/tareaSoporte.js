const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db/connection");

class TareaSoporte extends Model {}
TareaSoporte.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    descripcion: DataTypes.STRING,
    obligatoria: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },

    fechaInicioReal: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechaCierre: {
      type: DataTypes.DATE,
    },
    observacionCierre: DataTypes.TEXT,
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "tareaSoportes",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = TareaSoporte;
