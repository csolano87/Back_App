const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../db/connection");

class Menu extends Model {}

Menu.init(
  {
    nombre: {
      type: DataTypes.STRING,
      required: [true, "El nombre es obligatorio"],
      allowNull: false,
      unique: true,
    },
    ruta: {
      type: DataTypes.STRING,
      required: [true, "La ruta es obligatorio"],
      //allowNull: false,
     // unique: true,
    },
    icono: DataTypes.STRING,
    orden: {
      type: DataTypes.INTEGER,
      required: [true, "El # orden  es obligatorio"],
     // allowNull: false,
     // unique: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "menus",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = Menu;
