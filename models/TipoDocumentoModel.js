const { DataTypes } = require('sequelize');

module.exports = (sequelize) => { 
    return sequelize.define("Tipo_Documento",{
        cod_tipo_documento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_tipo_documento: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },{
        tableName: 'Tipo_Documento',
        freezeTableName: true
    })
}