const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Usuario",{
        cod_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombres_usuario: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        apellidos_usuario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono_usuario: {
            type: DataTypes.STRING,
            allowNull: true
        },
        direccion_usuario: {
            type: DataTypes.STRING,
            allowNull: true
        },
        documento_usuario: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        ocupacion_usuario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_nacimiento_usuario: {
            type: DataTypes.DATEONLY,
            allowNull:false
        },
        correo_usuario: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        genero_usuario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        celular_usuario: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cod_sexo: {
            type: DataTypes.INTEGER
        },
        cod_tipo_documento: {
            type: DataTypes.INTEGER
        },
        cod_ciudad: {
            type: DataTypes.INTEGER
        },
        cod_tipo_pref_entrega: {
            type: DataTypes.INTEGER
        }

    },{
        tableName: 'Usuario',
        freezeTableName: true
    })
}