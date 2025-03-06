const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../db/connection");

class CategoriaTecnico extends Model {}
CategoriaTecnico.init(
  {
    nombre: DataTypes.STRING,

    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },

  {
    sequelize,
    modelName: "categoriaTecnicos",
    timestamps: false,
  }
);

module.exports = CategoriaTecnico;
