const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db/connection");

class AreaSoporte extends Model {}
AreaSoporte.init(
  {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,

    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "areaSoportes",
    timestamps: true,
    paranoid:false
  },
);

module.exports = AreaSoporte;
