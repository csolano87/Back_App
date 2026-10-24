const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db/connection");
class Equipo_Contrato extends Model {}
Equipo_Contrato.init(
  {
    numeroContrato: {
      type: DataTypes.STRING,
      required: [true, "El numero del contrato del equipo es obligatorio"],
      allowNull: false,

      unique: true,
    },
   fechaInicio: {
      type: DataTypes.DATE,
      required: [true, "La fecha de inicio del equipo es obligatorio"],
      allowNull: false,
    },

      fechaFin: {
      type: DataTypes.DATE,
      required: [true, "La fecha de fin del equipo es obligatorio"],
      allowNull: false,
    },

      fechaTransferencia: {
      type: DataTypes.DATE,
      required: [true, "La fecha de transferencia del equipo es obligatorio"],
      allowNull: false,
    },
    
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Equipo_Contratos",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = Equipo_Contrato;
