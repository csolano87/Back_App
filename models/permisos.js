const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");

class Permiso extends Model {}

Permiso.init(
  {
    nombre: {
      type: DataTypes.STRING,
      required: [true, "El nombre es obligatorio"],
    },
    codigo:{
      type: DataTypes.STRING,
      required: [true, "El codigo es obligatorio"],
    },
    descripcion: DataTypes.STRING,
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "permisos",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = Permiso;
