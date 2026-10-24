const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db/connection");
class Area_Equipo extends Model {}
Area_Equipo.init(
  {
    nombre: {
      type: DataTypes.STRING,
      required: [true, "El nombre del area es obligatorio"],
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
    modelName: "Area_Equipos",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = Area_Equipo;
