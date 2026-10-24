const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db/connection");
class Empresa extends Model {}
Empresa.init(
  {
    razonSocial: {
      type: DataTypes.STRING,
      required: [true, "El razon social es obligatorio"],
      allowNull: false,

      unique: true,
    },
    ruc: {
      type: DataTypes.STRING(13),
      required: [true, "El ruc es obligatorio"],
      allowNull: false,
      unique: true,
    },
    direccion: {
      type: DataTypes.STRING,
      required: [true, "La direccion es obligatorio"],
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    correo: {
      type: DataTypes.STRING,
      required: [true, "El correo es obligatorio"],
      allowNull: false,
      unique: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "empresas",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = Empresa;
