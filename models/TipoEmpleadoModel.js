const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    return sequelize.define("Tipo_Empleado",{
        cod_tipo_empleado: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_tipo_empleado: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },{
        tableName: 'Tipo_Empleado',
        freezeTableName: true
    })
}