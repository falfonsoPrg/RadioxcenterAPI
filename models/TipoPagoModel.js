const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Tipo_Pago",{
        cod_tipo_pago: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_tipo_pago: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },{
        tableName: 'Tipo_Pago',
        freezeTableName: true
    })
}