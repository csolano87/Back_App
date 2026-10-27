const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../../db/connection");

class Notificacion extends Model {}
Notificacion.init(
  {
    tipo: { type: DataTypes.STRING, allowNull: false },
    nombre: { type: DataTypes.STRING, allowNull: false },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    leida: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
    fechaLectura: {
      type: DataTypes.DATETIME,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  },

  {
    sequelize,
    modelName: "notificacions",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = Notificacion;
