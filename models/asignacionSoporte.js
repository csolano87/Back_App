const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

class AsignacionSoporte extends Model {}
AsignacionSoporte.init(
  {
    fechaAsignacion: DataTypes.STRING,
    
   
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "asignacionSoportes",
    timestamps: false,
  }
);

module.exports = AsignacionSoporte;
