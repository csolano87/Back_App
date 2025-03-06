const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../db/connection");

class Sintoma extends Model {}
Sintoma.init(
  {
    Sintoma: DataTypes.STRING,
    fechaSintoma: DataTypes.DATE,
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },

  {
    sequelize,
    modelName: "sintomas",
    timestamps: false,
  }
);

module.exports = Sintoma;
