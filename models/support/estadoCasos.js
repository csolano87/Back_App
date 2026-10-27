const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db/connection");

class EstadoCaso extends Model {}
EstadoCaso.init(
  {
    codigo: {
      type: DataTypes.STRING,
      unique: true,
    },
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    esFinal: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },

    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "estadoCasos",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = EstadoCaso;
