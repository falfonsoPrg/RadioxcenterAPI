const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Factura", {
        cod_factura: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        numero_factura:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        resumen_factura:{
            type: DataTypes.STRING,
            allowNull: false
        },
        ruta_factura: {
            type: DataTypes.STRING,
            allowNull: false
        },
        documento_usuario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        valor_total_factura: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        fecha_factura: {
            type: DataTypes.DATE,
            allowNull: false
        },
        direccion_mac: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cod_tipo_pago: {
            type: DataTypes.INTEGER
        }
    },{
        tableName: 'Factura',
        freezeTableName: true
    })
}