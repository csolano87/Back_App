const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");

class Usuario extends Model {}
Usuario.init(
  {
    apellidos: DataTypes.STRING,

    nombres: DataTypes.STRING,

    usuario: DataTypes.STRING,

    password: DataTypes.STRING,

   // rol: DataTypes.INTEGER,
 

    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },

  {
    sequelize,
    modelName: "usuarios",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = Usuario;
