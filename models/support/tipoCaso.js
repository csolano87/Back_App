const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../../db/connection");

class TipoCaso extends Model {}
TipoCaso.init(
  {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,

    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },

  {
    sequelize,
    modelName: "tipoCasos",
    timestamps: true,
  }
);

module.exports = TipoCaso;
