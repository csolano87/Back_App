const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db/connection");

class TareaIntervencion extends Model {}
TareaIntervencion.init(
  {
    descripcion:{
      type: DataTypes.STRING,
      allowNull: false,
    },

    fechaInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechaFin: {
      type: DataTypes.DATE,
    },
    resultado: DataTypes.STRING,
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "tareaIntervencions",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = TareaIntervencion;
