const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db/connection");

class CasoAsignacion extends Model {}
CasoAsignacion.init(
  {
    motivo: DataTypes.TEXT,
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
    modelName: "casoAsignacions",
    timestamps: true,
    paranoid:false
  },
);

module.exports = CasoAsignacion;
