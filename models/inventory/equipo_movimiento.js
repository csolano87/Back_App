const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db/connection");
class Equipo_Movimiento extends Model {}
Equipo_Movimiento.init(
  {
    nombre: {
      type: DataTypes.STRING,
      required: [true, "El nombre del tipo de adquisicion  es obligatorio"],
      allowNull: false,

      unique: true,
    },
    fechaMovimiento: {
      type: DataTypes.DATE,
      required: [true, "La fecha de movimiento del equipo es obligatorio"],
      allowNull: false,
    },

    observacion: {
      type: DataTypes.STRING,
      required: [true, "La observacion  es obligatorio"],
      allowNull: false,

    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Equipo_Movimientos",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = Equipo_Movimiento;
