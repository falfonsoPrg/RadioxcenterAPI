const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Servicio", {
        cod_servicio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_servicio: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        descripcion_servicio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        precio_servicio: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        iva_servicio: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },{
        tableName: 'Servicio',
        freezeTableName: true
    })
}