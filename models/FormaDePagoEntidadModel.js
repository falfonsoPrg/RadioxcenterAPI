const { DataType, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Forma_De_Pago_Entidad",{
        cod_forma_de_pago_entidad:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_forma_de_pago_entidad: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },{
        tableName: 'Forma_De_Pago_Entidad',
        freezeTableName: true
    })
}