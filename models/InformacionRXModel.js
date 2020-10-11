const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Informacion_RX",{
        cod_informacion_rx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nit_rx: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        razon_social: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        nombre_comercial: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },{
        tableName:'Informacion_RX',
        freezeTableName: true
    })
}