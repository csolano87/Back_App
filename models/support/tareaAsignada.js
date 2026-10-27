const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db/connection");

class TareaAsignada extends Model {}
TareaAsignada.init(
  {
    motivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fechaAsignacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "tareaAsignadas",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = TareaAsignada;
