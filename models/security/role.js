const {  DataTypes, Model } = require("sequelize");
const sequelize = require("../../db/connection");
//const Cabecera = require('./cabecera');

class Rol extends Model {}
Rol.init(
  {
    nombre: {
      type: DataTypes.STRING,
      required: [true, "El nombre es obligatorio"],
       allowNull: false,
      unique: true,
      
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
   sequelize,
    tableName: "roles",
    timestamps: true,
    paranoid: false,
  },
);
module.exports = Rol;
