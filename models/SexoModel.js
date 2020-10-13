const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Sexo",{
        cod_sexo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_sexo: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    },{
        tableName: 'Sexo',
        freezeTableName: true
    })
}