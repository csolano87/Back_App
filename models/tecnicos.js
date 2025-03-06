const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

class Tecnico extends Model {}
Tecnico.init(
  {
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING,
   /*  especialidadId:DataTypes.INTEGER,
    CategioriaId:DataTypes.INTEGER, */
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "tecnicos",
    timestamps: false,
  }
);

module.exports = Tecnico;
