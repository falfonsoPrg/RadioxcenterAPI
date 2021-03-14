const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Transaccion", {
        cod_transaccion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        documento_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numero_transaccion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        valor_transaccion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha_transaccion: {
            type: DataTypes.DATEONLY
        },
        nombres_acudiente: {
            type: DataTypes.STRING,
            allowNull: true
        },
        apellidos_acudiente: {
            type: DataTypes.STRING,
            allowNull: true
        },
        documento_acudiente: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        parentesco_acudiente: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cod_entidad_doctor: {
            type: DataTypes.INTEGER
        }
    },{
        tableName: 'Transaccion',
        freezeTableName: true
    })
}