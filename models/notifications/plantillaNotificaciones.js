const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../../db/connection");

class PlantillaNotificacion extends Model {}
PlantillaNotificacion.init(
  {
    codigo: { type: DataTypes.STRING, unique: true },
    canal: { type: DataTypes.ENUM("PUSH", "EMAIL", "WEB"), allowNull: false },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contenido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },

  {
    sequelize,
    modelName: "plantillaNotificacions",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = PlantillaNotificacion;
