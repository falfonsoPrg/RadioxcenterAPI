const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Paquete", {
        cod_paquete: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_paquete: {
            type: DataTypes.STRING,
            allowNull: false
        },
        precio_paquete: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        tableName: 'Paquete',
        freezeTableName: true
    })
}