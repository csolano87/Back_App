const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../db/connection");

class Usuario extends Model {}
Usuario.init(
  {
    apellidos:{
      type: DataTypes.STRING,
      required: [true, "El apellido social es obligatorio"],
      allowNull: false,

      unique: true,
    },

    nombres: {
      type: DataTypes.STRING,
      required: [true, "El nombre social es obligatorio"],
      allowNull: false,

      unique: true,
    },

    usuario: {
      type: DataTypes.STRING,
      required: [true, "El usuario social es obligatorio"],
      allowNull: false,

      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      required: [true, "La password es obligatorio"],
      allowNull: false,

      
    },

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
