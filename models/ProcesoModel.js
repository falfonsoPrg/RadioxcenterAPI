const { DataType, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Proceso",{
        cod_proceso: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        estado_proceso: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cod_usuario: {
            type: DataTypes.INTEGER
        }
    },{
        tableName: 'Proceso',
        freezeTableName: true
    })
}