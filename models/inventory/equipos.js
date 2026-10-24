const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../../db/connection");

class Equipo extends Model {}
Equipo.init(
  {
    nombre: {
      type: DataTypes.STRING,
      required: [true, "El nombre del equipo es obligatorio"],
      allowNull: false,

      unique: true,
    },
    modelo: {
      type: DataTypes.STRING,
      /* required: [true, "El modelo del equipo es obligatorio"],
      allowNull: false, */

      //unique: true,
    },
    serie: {
      type: DataTypes.STRING,
      required: [true, "La serie del equipo es obligatorio"],
      allowNull: false,

      unique: true,
    },
    descripcion: DataTypes.STRING,
    fechaElaboracion: {
      type: DataTypes.DATE,
      required: [true, "La fecha de elaboracion del equipo es obligatorio"],
      allowNull: false,
    },
    fechaInstalacion: {
      type: DataTypes.DATE,
      /* required: [true, "La fecha de instalacion del equipo es obligatorio"],
      allowNull: false, */
    },
    fechaInicioUso: {
      type: DataTypes.DATE,
      /*  required: [true, "La fecha de inicio de uso del equipo es obligatorio"],
      allowNull: false, */
    },

    fechaBaja: {
      type: DataTypes.DATE,
      //required: [true, "La fecha de baja de uso del equipo es obligatorio"],
    },
    motivoBaja: {
      type: DataTypes.DATE,
      //required: [true, "La fecha de baja de uso del equipo es obligatorio"],
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },

  {
    sequelize,
    modelName: "equipos",
    timestamps: false,
  },
);

module.exports = Equipo;
