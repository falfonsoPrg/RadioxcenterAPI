const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    return sequelize.define("Consentimiento",{
        cod_consentimiento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        ubicacion_consentimiento: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cod_tipo_consentimiento: {
            type: DataTypes.INTEGER
        },
        cod_transaccion: {
            type: DataTypes.INTEGER
        }

    },{
        tableName: 'Consentimiento',
        freezeTableName: true
    })
}