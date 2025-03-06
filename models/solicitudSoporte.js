const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../db/connection");

class SolicitudSoporte extends Model {}
SolicitudSoporte.init(
    {
        descripcion: DataTypes.STRING,

       // prioridad: DataTypes.STRING,

        tiempoAtencion: DataTypes.TIME,
        tiempoEspera: DataTypes.TIME,
        fechacreacion:DataTypes.DATE,
        
        imagen:DataTypes.BLOB,
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
        },
    },

    {
        sequelize,
        modelName: "solicitudSoportes",
        timestamps: false,
    }
);

module.exports = SolicitudSoporte;
