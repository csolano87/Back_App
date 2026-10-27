const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db/connection");

class CasoAdjunto extends Model {}
CasoAdjunto.init(
  {
    nombreOriginal: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    rutaArchivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    tamanioBytes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      //allowNull: false,
    },

    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "casoAdjuntos",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = CasoAdjunto;
