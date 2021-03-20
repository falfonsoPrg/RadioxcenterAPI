const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Tipo_Consentimiento",{
        cod_tipo_consentimiento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_tipo_consentimiento: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
    },{
        tableName: 'Tipo_Consentimiento',
        freezeTableName: true

    })
}