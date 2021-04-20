const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Entidad_doctor",{
        cod_entidad_doctor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        cod_doctor: {
            type: DataTypes.INTEGER
        },
        cod_entidad: {
            type: DataTypes.INTEGER
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },{
        tableName: 'Entidad_doctor',
        FreezeTableName: true
    })
}