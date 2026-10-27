const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db/connection");

class TareaDependencia extends Model {}
TareaDependencia.init(
  {
   
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "tareaDependencias",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = TareaDependencia;
