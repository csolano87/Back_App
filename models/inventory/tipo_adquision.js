const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db/connection");
class Tipo_Adquisicion extends Model {}
Tipo_Adquisicion.init(
  {
    nombre: {
      type: DataTypes.STRING,
      required: [true, "El nombre del tipo de adquisicion  es obligatorio"],
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
    modelName: "Tipo_Adquisiciones",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = Tipo_Adquisicion;
