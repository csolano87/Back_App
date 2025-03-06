const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

class Cliente extends Model {}
Cliente.init(
  {
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "clientes",
    timestamps: false,
  }
);

module.exports = Cliente;
