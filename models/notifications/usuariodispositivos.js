const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../../db/connection");

class UsuarioDispositivo extends Model {}
UsuarioDispositivo.init(
  {
    tokenPush: { type: DataTypes.STRING, allowNull: false },
    proveedorPush: { type: DataTypes.STRING, allowNull: false },
    plataforma: { type: DataTypes.ENUM("ANDROID", "IOS"), allowNull: false },
    identificadorInstalacion: {
      type: DataTypes.STRING,
    },
    ultimaConexion: {
      type: DataTypes.DATETIME,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },

  {
    sequelize,
    modelName: "usuarioDispositivos",
    timestamps: true,
    paranoid: false,
  },
);

module.exports = UsuarioDispositivo;
