const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Paquete_servicio", {
        cod_paquete_servicio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        cod_paquete: {
            type: DataTypes.INTEGER
        },
        cod_servicio: {
            type: DataTypes.INTEGER
        }
    },{
        tableName: 'Paquete_servicio' ,
        freezeTableName: true
    })
}