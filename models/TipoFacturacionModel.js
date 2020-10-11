const sequelize = require("../database/sequelize");

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Tipo_Facturacion",{
        cod_tipo_facturacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNul: false
        },
        nombre_tipo_facturacion: {
            type: DataTypes.STRING,
            allowNul: false,
            unique: true
        }
    },{
            tableName: 'Tipo_Facturacion',
            freezeTableName: true
        

    })
}