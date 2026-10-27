const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../../db/connection");

class EstadoTarea extends Model {}
EstadoTarea.init(
  {
    codigo: { type: DataTypes.STRING, unique: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
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
    modelName: "estadoTareas",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = EstadoTarea;
