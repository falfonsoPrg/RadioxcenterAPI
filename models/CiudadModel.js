const { DataTypes } = require('sequelize');

module.exports = (sequelize)  => {
    return sequelize.define("Ciudad",{
        cod_ciudad: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nom_ciudad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cod_departamento: {
            type: DataTypes.INTEGER
        }
    },{
        tableName:'Ciudad',
        freezeTableName: true
    })
}

