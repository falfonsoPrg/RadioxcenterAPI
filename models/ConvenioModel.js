const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Convenio", {
        cod_convenio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        valor_servicio: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha_inicial_convenio: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        fecha_final_convenio: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        cod_entidad: { 
            type: DataTypes.INTEGER
        },
        cod_servicio: {
            type: DataTypes.INTEGER
        }
    },{
        tableName: 'Convenio',
        freezeTableName: true
    })
}