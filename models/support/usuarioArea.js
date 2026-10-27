const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../../db/connection");

class UsuarioArea extends Model {}
UsuarioArea.init(
  {
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },

  {
    sequelize,
    modelName: "usuarioAreas",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = UsuarioArea;
