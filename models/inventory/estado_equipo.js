const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db/connection");
class Estado_Equipo extends Model {}
Estado_Equipo.init(
  {
    nombre: {
      type: DataTypes.STRING,
      required: [true, "El nombre del estado del equipo es obligatorio"],
      allowNull: false,

      unique: true,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Estado_Equipos",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = Estado_Equipo;
