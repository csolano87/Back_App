const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../../db/connection");

class ModalidadAtencion extends Model {}
ModalidadAtencion.init(
  {
    codigo: {
      type: DataTypes.STRING,
      unique: true,
    },
    mombre: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },

  {
    sequelize,
    modelName: "modalidadAtencions",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = ModalidadAtencion;
