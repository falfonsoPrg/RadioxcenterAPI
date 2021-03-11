const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Numeracion",{
        cod_numeracion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        numeracion_siglas: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numeracion_nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numeracion_inicial: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numeracion_final: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numeracion_aumento: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numeracion_actual: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
    },{
        tableName: 'Numeracion',
        FreezeTableName: true
    })
}