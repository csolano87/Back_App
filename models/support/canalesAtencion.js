const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../../db/connection");

class CanalAtencion extends Model {}
CanalAtencion.init(
  {
    nombre: DataTypes.STRING,

    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },

  {
    sequelize,
    modelName: "canalAtencions",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = CanalAtencion;
