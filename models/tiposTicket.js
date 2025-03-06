const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../db/connection");

class TipoTicket extends Model {}
TipoTicket.init(
  {
    nombre: DataTypes.STRING,

    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },

  {
    sequelize,
    modelName: "tipoTickets",
    timestamps: false,
  }
);

module.exports = TipoTicket;
