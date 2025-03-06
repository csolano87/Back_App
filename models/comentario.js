const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../db/connection");

class Comentario extends Model {}
Comentario.init(
  {
    comentario: DataTypes.STRING,
    fechaComentario: DataTypes.DATE,
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },

  {
    sequelize,
    modelName: "comentarios",
    timestamps: false,
  }
);

module.exports = Comentario;
