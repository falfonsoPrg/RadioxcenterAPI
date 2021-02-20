const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Transaccion_Factura", {
        cod_transaccion_factura: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        cod_transaccion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cod_factura: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        tableName: 'Transaccion_Factura',
        freezeTableName: true
    })
}