const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db/connection");
class Marca extends Model {}
Marca.init(
  {
    nombre: {
      type: DataTypes.STRING,
      required: [true, "El nombre de la marca es obligatorio"],
      allowNull: false,

      unique: true,
    },

    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Marcas",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = Marca;
