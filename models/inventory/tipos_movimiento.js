const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db/connection");
class Tipo_Movimiento extends Model {}
Tipo_Movimiento.init(
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
    modelName: "Tipo_Movimientoes",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = Tipo_Movimiento;
