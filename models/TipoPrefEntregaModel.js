const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Tipo_Pref_Entrega",{
        cod_tipo_pref_entrega:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_tipo_pref_entrega: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },{
        tableName: 'Tipo_Pref_Entrega',
        freezeTableName: true
    })
}