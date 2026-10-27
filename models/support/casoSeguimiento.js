const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db/connection");

class CasoSeguimiento extends Model {}
CasoSeguimiento.init(
  {
    descripcion: DataTypes.STRING,
    esInterno: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },

    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "casoSeguimientos",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = CasoSeguimiento;
