const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Transaccion_servicio", {
        cod_transaccion_servicio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        cod_transaccion: {
            type: DataTypes.INTEGER
        },
        cod_servicio: {
            type: DataTypes.INTEGER
        }
    },{
        tableName: 'Transaccion_servicio' ,
        freezeTableName: true
    })
}