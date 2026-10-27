const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db/connection");

class TareaProgramada extends Model {}
TareaProgramada.init(
  {
    fechaInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechaFin: {
      type: DataTypes.DATE,
    },
    motivoCambio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vigente: {
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
    modelName: "tareaProgramadas",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = TareaProgramada;
