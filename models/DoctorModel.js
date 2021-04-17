const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Doctor",{
        cod_doctor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombres_doctor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellidos_doctor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direccion_doctor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono_doctor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        documento_doctor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correo_doctor: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        cod_tipo_documento: {
            type: DataTypes.INTEGER
        },
        cod_tipo_pref_entrega: {
            type: DataTypes.INTEGER
        },
        cod_ciudad: {
            type: DataTypes.INTEGER
        }
    },{
        tableName: 'Doctor',
        freezeTableName: true
    })
}